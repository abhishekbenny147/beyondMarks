package com.beyondmarks.demo.service;

import com.beyondmarks.demo.entity.CareerDomain;
import com.beyondmarks.demo.entity.InterestProfile;
import com.beyondmarks.demo.repository.CareerDomainRepository;
import com.beyondmarks.demo.repository.InterestProfileRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final CareerDomainRepository careerRepository;
    private final InterestProfileRepository profileRepository;
    private final ObjectMapper objectMapper;

    // Keyword map: answer value → skills/categories to match
    private static final Map<String, List<String>> INTEREST_MAP = Map.of(
        "technology",   List.of("Technology", "Python", "Cloud", "AI", "Data"),
        "creative",     List.of("Design", "Art", "Creative", "Media", "Content"),
        "helping",      List.of("Healthcare", "Education", "Social", "Counseling"),
        "business",     List.of("Business", "Finance", "Marketing", "Management"),
        "outdoor",      List.of("Environment", "Agriculture", "Sports", "Field"),
        "research",     List.of("Research", "Science", "Analysis", "Data"),
        "communication",List.of("Media", "Writing", "PR", "Journalism", "Content"),
        "numbers",      List.of("Finance", "Data", "Analytics", "Accounting")
    );

    public Map<String, Object> getRecommendations(Map<String, String> answers, String email) {
        // Save profile
        InterestProfile profile = InterestProfile.builder()
                .userEmail(email)
                .sessionId(UUID.randomUUID().toString())
                .answers(answers.toString())
                .build();
        profileRepository.save(profile);

        // Build keyword set from answers
        Set<String> keywords = new HashSet<>();
        for (String answer : answers.values()) {
            List<String> mapped = INTEREST_MAP.getOrDefault(answer.toLowerCase(), List.of());
            keywords.addAll(mapped);
        }

        // Score each career
        List<CareerDomain> all = careerRepository.findAll();
        Map<CareerDomain, Integer> scores = new HashMap<>();

        for (CareerDomain career : all) {
            int score = 0;
            String searchText = (
                (career.getName() == null ? "" : career.getName()) + " " +
                (career.getCategory() == null ? "" : career.getCategory()) + " " +
                (career.getRequiredSkills() == null ? "" : career.getRequiredSkills()) + " " +
                (career.getDescription() == null ? "" : career.getDescription())
            ).toLowerCase();

            for (String keyword : keywords) {
                if (searchText.contains(keyword.toLowerCase())) score++;
            }
            scores.put(career, score);
        }

        // Sort by score descending, take top 5
        List<CareerDomain> recommended = scores.entrySet().stream()
                .filter(e -> e.getValue() > 0)
                .sorted((a, b) -> b.getValue() - a.getValue())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // If nothing matched, return top 3 by default
        if (recommended.isEmpty()) {
            recommended = all.stream().limit(3).collect(Collectors.toList());
        }

        Map<String, Object> result = new HashMap<>();
        result.put("profileId", profile.getId());
        result.put("recommendations", recommended);
        result.put("totalAnswered", answers.size());
        return result;
    }
}