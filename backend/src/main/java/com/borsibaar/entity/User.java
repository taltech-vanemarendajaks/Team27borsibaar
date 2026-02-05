package com.borsibaar.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  @Id @GeneratedValue private UUID id;

  private Long organizationId;

  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  @ManyToOne(fetch = FetchType.LAZY) // Many users can have one role
  @JoinColumn(name = "role_id")
  private Role role;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "user_bar_stations",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "bar_station_id"))
  @Builder.Default
  private Set<BarStation> barStations = new HashSet<>();

  @CreationTimestamp private Instant createdAt;

  @UpdateTimestamp private Instant updatedAt;
}
