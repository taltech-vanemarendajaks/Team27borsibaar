package com.borsibaar.repository;

import com.borsibaar.entity.Category;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByIdAndOrganizationId(Long id, Long organizationId);

  Iterable<Category> findAllByOrganizationId(Long organizationId);

  boolean existsByOrganizationIdAndNameIgnoreCase(Long organizationId, String name);
}
