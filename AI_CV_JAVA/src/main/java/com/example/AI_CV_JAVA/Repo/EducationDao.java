package com.example.AI_CV_JAVA.Repo;

import com.example.AI_CV_JAVA.Entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationDao extends JpaRepository<Education, Long> {
}
