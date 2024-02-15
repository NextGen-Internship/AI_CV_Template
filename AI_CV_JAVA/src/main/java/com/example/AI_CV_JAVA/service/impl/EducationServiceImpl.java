package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.Repo.EducationRepository;
import com.example.AI_CV_JAVA.exception.DataNotFoundException;
import com.example.AI_CV_JAVA.service.interfaces.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Education getEducationById(Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Education with id " + id + " not found"));
    }

    public Education updateEducation(Long id, Education toUpdate) {
        educationRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Education with id " + id + " not found"));
        toUpdate.setId(id);
        return educationRepository.save(toUpdate);
    }

    public void deleteEducation(Long id) {
        educationRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Education with id " + id + " not found"));
        educationRepository.deleteById(id);
    }
}
