package com.haulu.backend.core.adapter.controller;

import com.haulu.backend.core.application.port.inbound.UserService;
import com.haulu.backend.core.domain.model.entity.User;
import com.haulu.backend.core.domain.model.payload.ResponsePayload;
import com.haulu.backend.core.domain.model.payload.request.UserQueryByIdsRequest;
import com.haulu.backend.core.domain.model.payload.request.UserUpdateRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/user/")
@CrossOrigin(value = "*")
@Slf4j
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/update")
    @Transactional
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateRequest updateRequest) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            userService.update(updateRequest);
            responsePayload.setMessage("User updated  successfully!!!");
            responsePayload.setData(null);
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }

    @PostMapping("/delete/{id}")
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            userService.delete(id);
            responsePayload.setMessage("User deleted successfully!!!");
            responsePayload.setData(null);
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            User user = userService.findById(id);
            responsePayload.setMessage("Successfully!!!");
            responsePayload.setData(user);
            responsePayload.setRowCount(1L);
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }

    @PostMapping("/list")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserList(@RequestBody UserQueryByIdsRequest userQueryByIdsRequest) {
        ResponsePayload responsePayload = new ResponsePayload();
        try {
            List<User> users = userService.findByIds(userQueryByIdsRequest.getIds());
            responsePayload.setMessage("Successfully!!!");
            responsePayload.setData(users);
            responsePayload.setRowCount((long) users.size());
            return ResponseEntity.ok(responsePayload);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            responsePayload.setErrorCode("500");
            responsePayload.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(responsePayload);
        }
    }
}
