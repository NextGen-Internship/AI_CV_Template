package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Technology;

import java.util.List;
import java.util.Optional;

public interface TechnologyService {

    public Technology saveTechnology(Technology technology);

    public List<Technology> getAllTechnologies();

    public Optional<Technology> getTechnologyById(Long id);

    public Technology updateTechnology(Long id, Technology toUpdateTechnology);

    public void deleteTechnology(Long id);
}

