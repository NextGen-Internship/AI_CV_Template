package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Person;

import java.util.List;
import java.util.Optional;

public interface PersonService {
    public Person savePerson(Person person);
    public List<Person> getAllPeople();
    public void deleteById(Long id);
    public Optional<Person> findById(long id);
    Optional<Person> getPersonByEmail(String email);
    void deleteById(long id);
}


