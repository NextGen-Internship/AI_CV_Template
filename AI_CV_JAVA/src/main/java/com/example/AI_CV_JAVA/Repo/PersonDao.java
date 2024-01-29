package com.example.AI_CV_JAVA.Repo;

import com.example.AI_CV_JAVA.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonDao extends JpaRepository<Person, String> {
}
