package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.PersonDao;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonDao personDao;

    public void savePerson(Person person) {
        personDao.saveAndFlush(person);
    }

    public List<Person> getAllPeople() {
        return personDao.findAll();
    }

    @Override
    public Optional<Person> findById(long id) {
        return personDao.findById(id);
    }

    public Optional<Person> getPersonByEmail(String email) {
        return personDao.findByEmail(email);
    }

    @Override
    public void deleteById(long id) {

    }

    @Override
    public void deleteByEmail(String email) {

    }

    @Override
    public boolean updateByEmail(Person person) {
    Optional<Person> editedPerson= personDao.findByEmail(person.getEmail());
    if (editedPerson.isPresent()){
        editedPerson.get().setSummary(person.getSummary());
        editedPerson.get().setTechnologies(person.getTechnologies());
        editedPerson.get().setEducation(person.getEducation());
        personDao.save(editedPerson.get());
        return true;
    }
        return false;
    }

    @Override
    public void addTechnology(Technology technology, long personId) {
      Optional<Person> person = personDao.findById(personId);
      if (person.isPresent()){
          person.get().getTechnologies().add(technology);
          personDao.save(person.get());
      }
    }
    public void deletePerson(Long id) {
        personDao.deleteById(id
        );
    }
}

