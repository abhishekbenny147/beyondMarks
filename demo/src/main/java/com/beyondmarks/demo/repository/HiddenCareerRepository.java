package com.beyondmarks.demo.repository;

import com.beyondmarks.demo.entity.HiddenCareer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HiddenCareerRepository extends JpaRepository<HiddenCareer, Long> {
    List<HiddenCareer> findByCategory(String category);
    List<HiddenCareer> findAllByOrderByCuriosityScoreDesc();
}