package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Technology;

import java.util.List;

public interface TechnologyService {

    Technology saveTechnology(Technology technology);

    List<Technology> getAllTechnologies();

    Technology getTechnologyById(Long id);

    Technology updateTechnology(Long id, Technology toUpdateTechnology);

    void deleteTechnology(Long id);

    boolean addTechnology(String name, long personId);

    Technology findTechnology(String name);
}

