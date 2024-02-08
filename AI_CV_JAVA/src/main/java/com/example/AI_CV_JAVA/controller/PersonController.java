package com.example.AI_CV_JAVA.controller;


import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeople() {
        List<Person> allPeopleList = personService.getAllPeople();
        return new ResponseEntity<>(allPeopleList, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Boolean> updatePersonByEmail(@RequestBody Person person){
        if (personService.updateByEmail(person)){
            return ResponseEntity.ok().build();
        };
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<Person>> getPersonByEmail(@PathVariable String email) {
        Optional<Person> person = personService.getPersonByEmail(email);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deletePerson(@PathVariable String email) {
        personService.deleteByEmail(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
