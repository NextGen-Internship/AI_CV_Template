package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;
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

    @Override
    public boolean updateByEmail(Person person) {
    Optional<Person> editedPerson= personRepository.findByEmail(person.getEmail());
    if (editedPerson.isPresent()){
        editedPerson.get().setSummary(person.getSummary());
        editedPerson.get().setTechnologies(person.getTechnologies());
        editedPerson.get().setEducation(person.getEducation());
        personRepository.save(editedPerson.get());
        return true;
    }
        return false;
    }

    @Override
    public void addTechnology(Technology technology, long personId) {
      Optional<Person> person = personRepository.findById(personId);
      if (person.isPresent()){
          if (!person.get().getTechnologies().contains(technology)) { // Check if the technology is not already present
              person.get().getTechnologies().add(technology);
              personRepository.save(person.get());
          }
      }
    }
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }
}

