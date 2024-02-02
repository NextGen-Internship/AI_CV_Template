package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.TechnologyDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TechnologyServiceImpl {
    private final TechnologyDao technologyDao;

    public Technology saveTechnology(Technology technology){
        return technologyDao.saveAndFlush(technology);
    }

    public List<Technology> getAllTechnologies(){
        return technologyDao.findAll();
    }

    public Optional<Technology> getTechnologyById(Long id){
        return technologyDao.findById(id);
    }

    public Technology updateTechnology(Long id, Technology toUpdateTechnology){
        Optional<Technology> existingTechnology = technologyDao.findById(id);
        if (existingTechnology.isPresent()){
            toUpdateTechnology.setId(id);
            return technologyDao.save(toUpdateTechnology);
        }
        return null;
    }

    public void deleteTechnology(Long id){
        technologyDao.deleteById(id);
    }
}

