package com.example.AI_CV_JAVA.Repo;


import com.example.AI_CV_JAVA.Entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceDao extends JpaRepository<Experience, Long> {
}
