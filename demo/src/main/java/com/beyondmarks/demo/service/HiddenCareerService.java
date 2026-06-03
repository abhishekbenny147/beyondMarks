package com.beyondmarks.demo.service;

import com.beyondmarks.demo.entity.HiddenCareer;
import com.beyondmarks.demo.repository.HiddenCareerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HiddenCareerService {

    private final HiddenCareerRepository repository;

    public List<HiddenCareer> getAll() {
        return repository.findAllByOrderByCuriosityScoreDesc();
    }

    public HiddenCareer getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hidden career not found"));
    }

    public HiddenCareer create(HiddenCareer career) {
        return repository.save(career);
    }

    public HiddenCareer upvote(Long id) {
        HiddenCareer career = getById(id);
        career.setCuriosityScore(career.getCuriosityScore() + 1);
        return repository.save(career);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}