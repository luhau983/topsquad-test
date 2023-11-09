package com.haulu.backend.core.adapter.controller;

import com.haulu.backend.core.adapter.business.config.jwt.JwtTokenProvider;
import com.haulu.backend.core.domain.model.entity.User;
import com.haulu.backend.core.domain.model.payload.request.LoginRequest;
import com.haulu.backend.core.domain.model.payload.request.SignupRequest;
import com.haulu.backend.core.domain.model.payload.response.JwtResponse;
import com.haulu.backend.core.domain.model.payload.ResponsePayload;
import com.haulu.backend.core.application.port.inbound.RoleService;
import com.haulu.backend.core.application.port.inbound.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/")
@CrossOrigin(value = "*")
@Slf4j
public class AuthController {

    @Autowired
    AuthenticationManager manager;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtUtils;


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            User createdUser = userService.registerUser(signUpRequest);
            responsePayload.setData(createdUser);
            responsePayload.setRowCount(1L);
            responsePayload.setMessage("User registered successfully!!!!");
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            JwtResponse jwtResponse = userService.authenticateUser(loginRequest);
            responsePayload.setMessage("Login successfully!!!");
            responsePayload.setData(jwtResponse);
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage() + ": invalid username or password");
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }


}
