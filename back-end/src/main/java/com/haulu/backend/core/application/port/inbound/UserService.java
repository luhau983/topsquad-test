package com.haulu.backend.core.application.port.inbound;

import com.haulu.backend.core.domain.model.entity.User;
import com.haulu.backend.core.domain.model.payload.request.LoginRequest;
import com.haulu.backend.core.domain.model.payload.request.SignupRequest;
import com.haulu.backend.core.domain.model.payload.request.UserUpdateRequest;
import com.haulu.backend.core.domain.model.payload.response.JwtResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User saveOrUpdate(User User);

    User registerUser(SignupRequest signUpRequest) throws Exception;

    JwtResponse authenticateUser(LoginRequest loginRequest);

    User delete(Long id);

    User update(UserUpdateRequest updateRequest);

    User findById(Long id);
    List<User> findByIds(List<Long> ids);
}
