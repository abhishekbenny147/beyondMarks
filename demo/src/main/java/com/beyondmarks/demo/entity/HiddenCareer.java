package com.beyondmarks.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hidden_careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HiddenCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String whyHidden;

    @Column(columnDefinition = "TEXT")
    private String discoveryTip;

    private String category;
    private String averageSalary;
    private String requiredSkills;

    @Builder.Default
    private Integer curiosityScore = 0;
}