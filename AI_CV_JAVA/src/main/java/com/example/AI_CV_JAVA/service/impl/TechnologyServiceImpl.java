package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.TechnologyRepository;
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
        return technologyRepository.findById(id);
    }

    public Technology updateTechnology(Long id, Technology toUpdateTechnology) {
        Optional<Technology> existingTechnology = technologyRepository.findById(id);
        if (existingTechnology.isPresent()) {
            toUpdateTechnology.setId(id);
            return technologyRepository.save(toUpdateTechnology);
        }
        return null;
    }

    public void deleteTechnology(Long id) {
        technologyRepository.deleteById(id);
    }
}

