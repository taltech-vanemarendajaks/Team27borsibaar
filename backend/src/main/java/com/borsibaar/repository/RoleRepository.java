package com.borsibaar.repository;

import com.borsibaar.entity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(String name);
  ; // e.g user or admin
}
