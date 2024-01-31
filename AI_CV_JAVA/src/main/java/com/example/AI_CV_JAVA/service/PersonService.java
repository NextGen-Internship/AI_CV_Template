package com.example.AI_CV_JAVA.service;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Repo.PersonDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonDao personDao;

    public Person savePerson(Person person){
        return personDao.saveAndFlush(person);
    }

    public List<Person> getAllPeople(){
        return personDao.findAll();
    }

    public Optional<Person> getPersonByEmail(String email){
        return personDao.findById(email);
    }

    public Person updatePerson(String email, Person toUpdate){
        Optional<Person> existingPerson = personDao.findById(email);
        if(existingPerson.isPresent()){
            toUpdate.setEmail(email);
            personDao.save(toUpdate);
        }
        return null;
    }

    public void deletePerson(String email){
        personDao.deleteById(email);
    }
}

