package com.haulu.backend.core.application.port.inbound.implement;


import com.haulu.backend.core.domain.model.entity.Role;
import com.haulu.backend.core.application.port.outbound.RoleRepository;
import com.haulu.backend.core.domain.model.core.enums.ERole;
import com.haulu.backend.core.application.port.inbound.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(ERole name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return roleRepository.save(role);
    }
}
