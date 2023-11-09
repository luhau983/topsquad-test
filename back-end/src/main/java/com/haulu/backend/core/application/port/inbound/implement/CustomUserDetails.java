package com.haulu.backend.core.application.port.inbound.implement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.haulu.backend.core.domain.model.entity.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String username;
    @JsonIgnore
    private String password;
    private  String email;
    private  String phone;
    private  Integer status;
    private Collection<? extends GrantedAuthority>  authorities;

    //Chuyen thong in user sang userDetails
    public static CustomUserDetails mapUserToUserDetails(User user) {
        //lay danh sach quyen user
        List<GrantedAuthority> authorityList = user.getRoles().stream()
                .map(item -> new SimpleGrantedAuthority(item.getName().name()))
                .collect(Collectors.toList());
        //tra ve CustomUserDetail
        return CustomUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail()).phone(user.getPhone())
                .status(user.getStatus())
                .authorities(authorityList)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
