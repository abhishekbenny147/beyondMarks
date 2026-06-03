package com.beyondmarks.demo.repository;

import com.beyondmarks.demo.entity.SavedCareer;
import com.beyondmarks.demo.entity.User;
import com.beyondmarks.demo.entity.CareerDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SavedCareerRepository extends JpaRepository<SavedCareer, Long> {
    List<SavedCareer> findByUser(User user);
    Optional<SavedCareer> findByUserAndCareer(User user, CareerDomain career);
    boolean existsByUserAndCareer(User user, CareerDomain career);

    @Transactional
    void deleteByUserAndCareer(User user, CareerDomain career);
}