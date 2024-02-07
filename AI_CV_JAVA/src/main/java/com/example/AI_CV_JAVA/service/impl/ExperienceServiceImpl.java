package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Repo.ExperienceRepository;
import com.example.AI_CV_JAVA.service.interfaces.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {
    private final ExperienceRepository experienceRepository;

    public Experience saveExperience(Experience experience) {
        return experienceRepository.saveAndFlush(experience);
    }

    public List<Experience> getAllExperience() {
        return experienceRepository.findAll();
    }

    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    public Experience updateExperience(Long id, Experience toUpdate) {
        Optional<Experience> existingExperience = experienceRepository.findById(id);
        if (existingExperience.isPresent()) {
            toUpdate.setId(id);
            return experienceRepository.save(toUpdate);
        }
        return null;
    }

    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}
