package com.beyondmarks.demo.controller;

import com.beyondmarks.demo.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService service;

    @PostMapping
    public ResponseEntity<Map<String, Object>> getRecommendations(
            @RequestBody Map<String, String> answers,
            Authentication auth) {
        String email = auth != null ? auth.getName() : "anonymous";
        return ResponseEntity.ok(service.getRecommendations(answers, email));
    }
}