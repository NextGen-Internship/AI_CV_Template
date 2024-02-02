package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Repo.ExperienceDao;
import com.example.AI_CV_JAVA.service.interfaces.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {
    private final ExperienceDao experienceDao;

    public Experience saveExperience(Experience experience){
        return experienceDao.saveAndFlush(experience);
    }

    public List<Experience> getAllExperience(){
        return experienceDao.findAll();
    }

    public Optional<Experience> getExperienceById(Long id){
        return experienceDao.findById(id);
    }

    public Experience updateExperience(Long id, Experience toUpdate){
        Optional<Experience> existingExperience = experienceDao.findById(id);
        if (existingExperience.isPresent()){
            toUpdate.setId(id);
            return experienceDao.save(toUpdate);
        }
        return null;
    }

    public void deleteExperience(Long id){
        experienceDao.deleteById(id);
    }
}
