package com.beyondmarks.demo.service;

import com.beyondmarks.demo.dto.CareerDomainDto;
import com.beyondmarks.demo.entity.CareerDomain;
import com.beyondmarks.demo.repository.CareerDomainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerDomainService {

    private final CareerDomainRepository repository;

    public List<CareerDomain> getAllCareers() {
        return repository.findAll();
    }

    public CareerDomain getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));
    }

    public CareerDomain getBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Career not found with slug: " + slug));
    }

    public List<CareerDomain> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<String> getAllCategories() {
        return repository.findAllCategories();
    }

    public List<CareerDomain> searchAndFilter(String query, String category) {
        String q = (query == null || query.isBlank()) ? null : query;
        String cat = (category == null || category.isBlank()) ? null : category;
        return repository.searchAndFilter(q, cat);
    }

    public List<CareerDomain> search(String query) {
        return repository.searchAndFilter(query, null);
    }

    public CareerDomain create(CareerDomainDto dto) {
        CareerDomain domain = CareerDomain.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .averageSalary(dto.getAverageSalary())
                .futureScope(dto.getFutureScope())
                .requiredSkills(dto.getRequiredSkills())
                .iconName(dto.getIconName())
                .colorHex(dto.getColorHex())
                .slug(dto.getSlug())
                .build();
        return repository.save(domain);
    }

    public CareerDomain update(Long id, CareerDomainDto dto) {
        CareerDomain existing = getById(id);
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setCategory(dto.getCategory());
        existing.setAverageSalary(dto.getAverageSalary());
        existing.setFutureScope(dto.getFutureScope());
        existing.setRequiredSkills(dto.getRequiredSkills());
        existing.setIconName(dto.getIconName());
        existing.setColorHex(dto.getColorHex());
        existing.setSlug(dto.getSlug());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}