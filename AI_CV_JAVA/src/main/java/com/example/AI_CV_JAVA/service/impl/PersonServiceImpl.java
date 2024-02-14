package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.PersonRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.ActivityService;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import com.example.AI_CV_JAVA.service.interfaces.UserService;
import com.example.AI_CV_JAVA.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;
    private final UserService userService;
    private final ActivityService activityService;

    public void savePerson(Person person) {
        personRepository.saveAndFlush(person);
    }

    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    @Override
    public Person findById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Person with id " + id + " not found"));
    }

    @Override
    public Optional<Person> getPersonByEmail(String email) {
        return Optional.ofNullable(personRepository.findByEmail(email)
                        .orElseThrow(() -> new DataNotFoundException("Person with email " + email + " not found")))
                .map(person -> {
                    User user = userService.getCurrentUser();
                    List<Activity> activities = user.getActivities();
                    activities.add(activityService.crteateActivity(user, email, Type.Searched));
                    user.setActivities(activities);
                    userService.saveUser(user);
                    return person;
                });
    }

    @Override
    public void deleteById(long id) {
        personRepository.deleteById(id);
    }

    @Override
    public void deleteByEmail(String email) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Person with email " + email + " not found"));
        personRepository.deleteById(person.getId());
    }

    @Override
    public boolean updateByEmail(Person person) {
        Person editedPerson = personRepository.findByEmail(person.getEmail())
                .orElseThrow(() -> new DataNotFoundException("Person with email " + person.getEmail() + " not found"));
        editedPerson.setSummary(person.getSummary());
        personRepository.save(editedPerson);
        return true;
    }

    @Override
    public void addTechnology(Technology technology, long personId) {
      Person person = personRepository.findById(personId)
              .orElseThrow(() -> new DataNotFoundException("Person with person " + personId + " not found"));

          if (!person.getTechnologies().contains(technology)) {
              person.getTechnologies().add(technology);
              personRepository.save(person);
          }
    }
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }
}

