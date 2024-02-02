package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Experience;

import java.util.List;
import java.util.Optional;

public interface ExperienceService {

    public Experience saveExperience(Experience experience);

    public List<Experience> getAllExperience();

    public Optional<Experience> getExperienceById(Long id);

    public Experience updateExperience(Long id, Experience toUpdate);



    public void deleteExperience(Long id);


}
