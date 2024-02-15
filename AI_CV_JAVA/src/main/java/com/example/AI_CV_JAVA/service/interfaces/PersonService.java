package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;

import java.util.List;

public interface PersonService {
    void savePerson(Person person);

    List<Person> getAllPeople();

    Person findById(long id);

    Person getPersonByEmail(String email);

    void deleteById(long id);

    void deleteByEmail(String email);

    boolean updateByEmail(Person person);

    void addTechnology(Technology technology, long personId);

    boolean emailExists(String email);
}


