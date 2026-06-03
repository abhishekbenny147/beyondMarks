package com.beyondmarks.demo.repository;

import com.beyondmarks.demo.entity.CareerDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CareerDomainRepository extends JpaRepository<CareerDomain, Long> {

    Optional<CareerDomain> findBySlug(String slug);
    List<CareerDomain> findByCategory(String category);

    @Query("SELECT DISTINCT c.category FROM CareerDomain c ORDER BY c.category")
    List<String> findAllCategories();

    @Query("SELECT c FROM CareerDomain c WHERE " +
           "(:q IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(c.requiredSkills) LIKE LOWER(CONCAT('%', :q, '%'))) AND " +
           "(:category IS NULL OR c.category = :category)")
    List<CareerDomain> searchAndFilter(
        @Param("q") String query,
        @Param("category") String category
    );
}