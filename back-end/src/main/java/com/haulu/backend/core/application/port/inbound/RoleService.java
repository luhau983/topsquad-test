package com.haulu.backend.core.application.port.inbound;

import com.haulu.backend.core.domain.model.entity.Role;
import com.haulu.backend.core.domain.model.core.enums.ERole;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(ERole name);

    Role saveOrUpdate(Role role);
}
