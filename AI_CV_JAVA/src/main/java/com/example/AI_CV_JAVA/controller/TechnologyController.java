package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.service.impl.TechnologyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/technology")
@RequiredArgsConstructor
public class TechnologyController {
    private final TechnologyServiceImpl technologyService;

    @PostMapping
    public ResponseEntity<Technology> saveEducation(@RequestBody Technology technology) {
        Technology savedTechnology = technologyService.saveTechnology(technology);
        return new ResponseEntity<>(savedTechnology, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Technology>> getAllTechnologies() {
        List<Technology> allTechnologies = technologyService.getAllTechnologies();
        return new ResponseEntity<>(allTechnologies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Technology>> getTechnologyById(@PathVariable Long id) {
        Optional<Technology> technology = technologyService.getTechnologyById(id);
        return new ResponseEntity<>(technology, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technology> updateTechnology(@PathVariable Long id, @RequestBody Technology toUpdateTechnology) {
        Technology updatedTechnology = technologyService.updateTechnology(id, toUpdateTechnology);
        if (updatedTechnology != null) {
            return new ResponseEntity<>(updatedTechnology, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnology(@PathVariable Long id) {
        technologyService.deleteTechnology(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}