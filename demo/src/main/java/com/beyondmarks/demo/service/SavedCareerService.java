package com.beyondmarks.demo.service;

import com.beyondmarks.demo.entity.CareerDomain;
import com.beyondmarks.demo.entity.SavedCareer;
import com.beyondmarks.demo.entity.User;
import com.beyondmarks.demo.repository.CareerDomainRepository;
import com.beyondmarks.demo.repository.SavedCareerRepository;
import com.beyondmarks.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SavedCareerService {

    private final SavedCareerRepository savedCareerRepository;
    private final UserRepository userRepository;
    private final CareerDomainRepository careerRepository;

    public List<SavedCareer> getSaved(String email) {
        User user = getUser(email);
        return savedCareerRepository.findByUser(user);
    }

    public Map<String, Object> toggleSave(Long careerId, String email) {
        User user = getUser(email);
        CareerDomain career = careerRepository.findById(careerId)
                .orElseThrow(() -> new RuntimeException("Career not found"));

        if (savedCareerRepository.existsByUserAndCareer(user, career)) {
            savedCareerRepository.deleteByUserAndCareer(user, career);
            return Map.of("saved", false, "message", "Career removed from saved");
        } else {
            SavedCareer saved = SavedCareer.builder()
                    .user(user)
                    .career(career)
                    .build();
            savedCareerRepository.save(saved);
            return Map.of("saved", true, "message", "Career saved successfully");
        }
    }

    public boolean isSaved(Long careerId, String email) {
        User user = getUser(email);
        CareerDomain career = careerRepository.findById(careerId)
                .orElseThrow(() -> new RuntimeException("Career not found"));
        return savedCareerRepository.existsByUserAndCareer(user, career);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}