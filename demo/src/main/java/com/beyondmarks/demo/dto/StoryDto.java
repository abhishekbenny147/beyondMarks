package com.beyondmarks.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StoryDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    private String careerName;
    private String authorName;
    private String photoUrl;
    private Boolean isAnonymous;
}