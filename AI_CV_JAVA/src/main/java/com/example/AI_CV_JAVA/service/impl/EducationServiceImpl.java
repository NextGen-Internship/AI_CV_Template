package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.Repo.EducationRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {
    private final EducationRepository educationRepository;

    public Education saveEducation(Education education) {
        return educationRepository.saveAndFlush(education);
    }

    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    public Optional<Education> getEducationById(Long id) {
        Optional<Education> education = educationRepository.findById(id);
        if (education.isEmpty()) {
            throw new DataNotFoundException("Education with id " + id + " not found");
        }
        return education;
    }

    public Education updateEducation(Long id, Education toUpdate) {
        Optional<Education> existingEducation = educationRepository.findById(id);
        if (existingEducation.isPresent()) {
            toUpdate.setId(id);
            return educationRepository.save(toUpdate);
        } else {
            throw new DataNotFoundException("Education with id " + id + " not found");
        }
    }

    public void deleteEducation(Long id) {
        Optional<Education> existingEducation = educationRepository.findById(id);
        if (existingEducation.isPresent()) {
            educationRepository.deleteById(id);
        } else {
            throw new DataNotFoundException("Education with id " + id + " not found");
        }
    }
}
