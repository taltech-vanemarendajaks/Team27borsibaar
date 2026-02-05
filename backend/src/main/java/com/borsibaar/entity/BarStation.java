package com.borsibaar.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "bar_stations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarStation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "organization_id", nullable = false)
  private Long organizationId;

  @Column(nullable = false)
  private String name;

  @Column(length = 500)
  private String description;

  @Column(name = "is_active", nullable = false)
  @Builder.Default
  private Boolean isActive = true;

  @CreationTimestamp
  @Column(name = "created_at")
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Instant updatedAt;

  @ManyToMany(mappedBy = "barStations", fetch = FetchType.LAZY)
  @Builder.Default
  private Set<User> users = new HashSet<>();
}
