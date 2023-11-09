package com.haulu.backend.core.application.port.outbound;

import com.haulu.backend.core.domain.model.entity.Role;
import com.haulu.backend.core.domain.model.core.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}