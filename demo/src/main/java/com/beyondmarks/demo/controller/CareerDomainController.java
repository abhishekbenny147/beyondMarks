package com.beyondmarks.demo.controller;

import com.beyondmarks.demo.dto.CareerDomainDto;
import com.beyondmarks.demo.entity.CareerDomain;
import com.beyondmarks.demo.service.CareerDomainService;
import com.beyondmarks.demo.service.CareerGuideService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/careers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CareerDomainController {

    private final CareerDomainService service;
    private final CareerGuideService careerGuideService;

    @GetMapping
    public ResponseEntity<List<CareerDomain>> getAll() {
        return ResponseEntity.ok(service.getAllCareers());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CareerDomain>> filter(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(service.searchAndFilter(q, category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CareerDomain> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<CareerDomain> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(service.getBySlug(slug));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<CareerDomain>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(service.getByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CareerDomain>> search(@RequestParam String q) {
        return ResponseEntity.ok(service.search(q));
    }

    @GetMapping("/{id}/guide")
    public ResponseEntity<Map<String, Object>> getGuide(@PathVariable Long id) {
        CareerDomain career = service.getById(id);
        return ResponseEntity.ok(careerGuideService.generateGuide(career));
    }

    @PostMapping
    public ResponseEntity<CareerDomain> create(@Valid @RequestBody CareerDomainDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CareerDomain> update(@PathVariable Long id,
                                               @Valid @RequestBody CareerDomainDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}