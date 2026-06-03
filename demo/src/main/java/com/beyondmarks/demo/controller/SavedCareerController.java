package com.beyondmarks.demo.controller;

import com.beyondmarks.demo.entity.SavedCareer;
import com.beyondmarks.demo.service.SavedCareerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/saved")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SavedCareerController {

    private final SavedCareerService service;

    @GetMapping
    public ResponseEntity<List<SavedCareer>> getSaved(Authentication auth) {
        return ResponseEntity.ok(service.getSaved(auth.getName()));
    }

    @PostMapping("/{careerId}")
    public ResponseEntity<Map<String, Object>> toggle(
            @PathVariable Long careerId, Authentication auth) {
        return ResponseEntity.ok(service.toggleSave(careerId, auth.getName()));
    }

    @GetMapping("/{careerId}/status")
    public ResponseEntity<Map<String, Object>> status(
            @PathVariable Long careerId, Authentication auth) {
        boolean saved = service.isSaved(careerId, auth.getName());
        return ResponseEntity.ok(Map.of("saved", saved));
    }
}