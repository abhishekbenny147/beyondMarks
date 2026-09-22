package com.beyondmarks.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interest_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterestProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private String sessionId;

    @Column(columnDefinition = "TEXT")
    private String answers;
}