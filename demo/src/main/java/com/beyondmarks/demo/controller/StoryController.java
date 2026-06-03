package com.beyondmarks.demo.controller;

import com.beyondmarks.demo.dto.StoryDto;
import com.beyondmarks.demo.entity.StudentStory;
import com.beyondmarks.demo.service.StoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StoryController {

    private final StoryService service;

    @GetMapping
    public ResponseEntity<List<StudentStory>> getApproved() {
        return ResponseEntity.ok(service.getApproved());
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentStory>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentStory> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<StudentStory> submit(@Valid @RequestBody StoryDto dto,
                                               Authentication auth) {
        String email = auth != null ? auth.getName() : "anonymous";
        return ResponseEntity.ok(service.submit(dto, email));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<StudentStory> approve(@PathVariable Long id) {
        return ResponseEntity.ok(service.approve(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<StudentStory> reject(@PathVariable Long id) {
        return ResponseEntity.ok(service.reject(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}