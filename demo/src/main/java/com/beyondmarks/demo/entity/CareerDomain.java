package com.beyondmarks.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "career_domains")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String averageSalary;

    @Column(columnDefinition = "TEXT")
    private String futureScope;

    @Column(columnDefinition = "TEXT")
    private String requiredSkills;

    private String iconName;
    private String colorHex;
    private String slug;
}