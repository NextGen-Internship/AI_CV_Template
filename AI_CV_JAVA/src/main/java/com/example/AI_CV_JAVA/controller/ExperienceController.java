package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.eclipse.jetty.http.HttpParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("experience")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceService experienceService;

    @PostMapping
    public ResponseEntity<Experience> saveExperience(@RequestBody Experience experience){
        Experience savedExperience = experienceService.saveExperience(experience);
        return new ResponseEntity<>(savedExperience, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences(){
        List<Experience> allExperiences = experienceService.getAllExperience();
        return new ResponseEntity<>(allExperiences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Experience>> getExperienceById(@PathVariable Long id){
        Optional<Experience> experience = experienceService.getExperienceById(id);
        return new ResponseEntity<>(experience, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience toUpdateExperience){
        Experience updatedExperience = experienceService.updateExperience(id, toUpdateExperience);
        if (updatedExperience != null){
            return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id){
        experienceService.deleteExperience(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
