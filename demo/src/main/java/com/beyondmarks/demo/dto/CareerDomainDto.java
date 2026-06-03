package com.beyondmarks.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CareerDomainDto {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;
    private String category;
    private String averageSalary;
    private String futureScope;
    private String requiredSkills;
    private String iconName;
    private String colorHex;
    private String slug;
}