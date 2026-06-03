package com.beyondmarks.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "career_id", nullable = false)
    private CareerDomain career;

    @Builder.Default
    private LocalDateTime savedAt = LocalDateTime.now();
}