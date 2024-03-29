package com.example.AI_CV_JAVA.Repo;

import com.example.AI_CV_JAVA.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    @Query("SELECT p FROM Person p WHERE p.email = :email")
    Optional<Person> findByEmail(@Param("email") String email);

    boolean existsByEmail(String email);

}