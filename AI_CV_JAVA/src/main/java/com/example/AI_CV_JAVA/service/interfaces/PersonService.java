package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Person;

import java.util.List;
import java.util.Optional;

public interface PersonService {
    void savePerson(Person person);

    List<Person> getAllPeople();

    Optional<Person> findById(long id);

    Optional<Person> getPersonByEmail(String email);

    void deleteById(long id);

    void deleteByEmail(String email);
}

