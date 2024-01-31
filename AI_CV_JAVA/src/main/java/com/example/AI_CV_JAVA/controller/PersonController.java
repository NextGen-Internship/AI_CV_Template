package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("person")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @PostMapping
    public ResponseEntity<Person> savePerson(@RequestBody Person person){
        Person savedPerson = personService.savePerson(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeople(){
        List<Person> allPeopleList = personService.getAllPeople();
        return new ResponseEntity<>(allPeopleList, HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<Person>> getPersonByEmail(@PathVariable String email){
        Optional<Person> person = personService.getPersonByEmail(email);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Person> updatePerson(@PathVariable String email, @RequestBody Person toUpdatePerson){
        Person updatedPerson = personService.updatePerson(email, toUpdatePerson);
        if(updatedPerson != null){
            return new ResponseEntity<>(updatedPerson, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deletePerson(@PathVariable String email){
        personService.deletePerson(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
