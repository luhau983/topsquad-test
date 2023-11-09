package com.haulu.backend.core.application.port.inbound.implement;

import com.haulu.backend.core.adapter.business.config.jwt.JwtTokenProvider;
import com.haulu.backend.core.domain.model.entity.Role;
import com.haulu.backend.core.domain.model.entity.User;
import com.haulu.backend.core.domain.model.payload.request.LoginRequest;
import com.haulu.backend.core.domain.model.payload.request.SignupRequest;
import com.haulu.backend.core.domain.model.payload.request.UserUpdateRequest;
import com.haulu.backend.core.domain.model.payload.response.JwtResponse;
import com.haulu.backend.core.application.port.outbound.UserRepository;
import com.haulu.backend.core.domain.model.core.enums.ERole;
import com.haulu.backend.core.application.port.inbound.RoleService;
import com.haulu.backend.core.application.port.inbound.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    AuthenticationManager manager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtUtils;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User saveOrUpdate(User User) {
        return userRepository.save(User);
    }

    @Override
    public User registerUser(SignupRequest signUpRequest) throws Exception {
        if (existsByUsername(signUpRequest.getUsername())) {
            throw new Exception("Error: Username is already taken!");
        }

        if (existsByEmail(signUpRequest.getEmail())) {
            throw new Exception("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setPhone(signUpRequest.getPhone());
        user.setStatus(1);
        Set<Role> roles = checkRole(signUpRequest.getRole());
        user.setRoles(roles);
        return saveOrUpdate(user);
    }

    @Override
    public JwtResponse authenticateUser(@NotNull LoginRequest loginRequest) {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return  new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);
    }

    @Override
    public User delete(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        userRepository.deleteById(id);
        return null;
    }

    @Override
    public User update(@NotNull UserUpdateRequest updateRequest) {
        User userOld = userRepository.findByUsername(updateRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        User user = new User();
        user.setId(userOld.getId());
        user.setUsername(updateRequest.getUsername());
        user.setPassword(updateRequest.getPassword());
        user.setStatus(updateRequest.getStatus());
        user.setEmail(updateRequest.getEmail());
        user.setPhone(updateRequest.getPhone());
        user.setPassword(userOld.getPassword());
        Set<Role> roles = checkRole(updateRequest.getRole());
        user.setRoles(roles);
        return saveOrUpdate(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
    }

    @Override
    public List<User> findByIds(List<Long> ids) {
        return userRepository.findAllById(ids);
    }

    @NotNull
    private Set<Role> checkRole(Set<String> strRoles) {
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleService.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ADMIN" -> {
                        Role adminRole = roleService.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                    }
                    case "MOD" -> {
                        Role modRole = roleService.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                    }
                    default -> {
                        Role userRole = roleService.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                    }
                }
            });
        }
        return roles;
    }


}
