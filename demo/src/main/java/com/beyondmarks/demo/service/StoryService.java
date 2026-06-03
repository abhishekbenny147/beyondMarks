package com.beyondmarks.demo.service;

import com.beyondmarks.demo.dto.StoryDto;
import com.beyondmarks.demo.entity.StudentStory;
import com.beyondmarks.demo.repository.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepository repository;

    public List<StudentStory> getApproved() {
        return repository.findByStatus(StudentStory.Status.APPROVED);
    }

    public List<StudentStory> getAll() {
        return repository.findAll();
    }

    public StudentStory getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found"));
    }

    public StudentStory submit(StoryDto dto, String email) {
        StudentStory story = StudentStory.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .careerName(dto.getCareerName())
                .authorName(dto.getIsAnonymous() != null && dto.getIsAnonymous()
                        ? "Anonymous" : dto.getAuthorName())
                .authorEmail(email)
                .photoUrl(dto.getPhotoUrl())
                .isAnonymous(dto.getIsAnonymous() != null && dto.getIsAnonymous())
                .status(StudentStory.Status.PENDING)
                .build();
        return repository.save(story);
    }

    public StudentStory approve(Long id) {
        StudentStory story = getById(id);
        story.setStatus(StudentStory.Status.APPROVED);
        return repository.save(story);
    }

    public StudentStory reject(Long id) {
        StudentStory story = getById(id);
        story.setStatus(StudentStory.Status.REJECTED);
        return repository.save(story);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}