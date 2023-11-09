package com.haulu.backend.core.domain.model.payload.request;

import lombok.*;

import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private Set<String> role;
    private int status = 1;
}
