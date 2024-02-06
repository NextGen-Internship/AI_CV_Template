package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.TechnologyRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TechnologyServiceImpl {
    private final TechnologyRepository technologyRepository;

    public Technology saveTechnology(Technology technology) {
        return technologyRepository.saveAndFlush(technology);
    }

    public List<Technology> getAllTechnologies() {
        return technologyRepository.findAll();
    }

    public Optional<Technology> getTechnologyById(Long id) {
        Optional<Technology> technology = technologyRepository.findById(id);
        if (technology.isEmpty()) {
            throw new DataNotFoundException("Technology with id " + id + " not found");
        }
        return technology;
    }

    public Technology updateTechnology(Long id, Technology toUpdateTechnology) {
        Optional<Technology> existingTechnology = technologyRepository.findById(id);
        if (existingTechnology.isPresent()) {
            toUpdateTechnology.setId(id);
            return technologyRepository.save(toUpdateTechnology);
        } else {
            throw new DataNotFoundException("Technology with id " + id + " not found");
        }
    }

    public void deleteTechnology(Long id) {
        Optional<Technology> technology = technologyRepository.findById(id);
        if(technology.isEmpty()){
            throw new DataNotFoundException("Technology with id " + id + " not found");
        }
        technologyRepository.deleteById(id);
    }
}

