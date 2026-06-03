package com.beyondmarks.demo.repository;

import com.beyondmarks.demo.entity.StudentStory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoryRepository extends JpaRepository<StudentStory, Long> {
    List<StudentStory> findByStatus(StudentStory.Status status);
    List<StudentStory> findByCareerName(String careerName);
}