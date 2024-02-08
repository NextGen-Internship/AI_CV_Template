package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Repo.PersonRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;

    public void savePerson(Person person) {
        personRepository.saveAndFlush(person);
    }

    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    @Override
    public Optional<Person> findById(long id) {
        Optional<Person> person = personRepository.findById(id);
        if (person.isEmpty()) {
            throw new DataNotFoundException("Person with id " + id + " not found");
        }
        return person;
    }

    @Override
    public Optional<Person> getPersonByEmail(String email) {
        Optional<Person> person = personRepository.findByEmail(email);
        if (person.isEmpty()) {
            throw new DataNotFoundException("Person with email " + email + " not found");
        }
        return person;
    }

    @Override
    public void deleteById(long id) {
        personRepository.deleteById(id);
    }

    @Override
    public void deleteByEmail(String email) {
        Optional<Person> person = personRepository.findByEmail(email);
        if (person.isEmpty()) {
            throw new DataNotFoundException("Person with email " + email + " not found");
        }
        personRepository.deleteById(person.get().getId());
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }
}

