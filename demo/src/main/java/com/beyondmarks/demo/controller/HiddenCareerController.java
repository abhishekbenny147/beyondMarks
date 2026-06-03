package com.beyondmarks.demo.controller;

import com.beyondmarks.demo.entity.HiddenCareer;
import com.beyondmarks.demo.service.HiddenCareerService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/hidden-careers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HiddenCareerController {

    private final HiddenCareerService service;

    @GetMapping
    public ResponseEntity<List<HiddenCareer>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HiddenCareer> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<HiddenCareer> create(@RequestBody HiddenCareer career) {
        return ResponseEntity.ok(service.create(career));
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<HiddenCareer> upvote(@PathVariable Long id) {
        return ResponseEntity.ok(service.upvote(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Autowired
    private com.beyondmarks.demo.service.HiddenCareerGuideService hiddenCareerGuideService;

    @GetMapping("/{id}/guide")
    public ResponseEntity<Map<String, Object>> getGuide(@PathVariable Long id) {
    HiddenCareer career = service.getById(id);
    return ResponseEntity.ok(hiddenCareerGuideService.generateGuide(career));
    }
}