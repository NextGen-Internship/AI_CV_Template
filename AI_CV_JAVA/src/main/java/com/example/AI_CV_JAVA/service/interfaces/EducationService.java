package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Education;

import java.util.List;
import java.util.Optional;

public interface EducationService {

    public Education saveEducation(Education education);

    public List<Education> getAllEducations();


    public Optional<Education> getEducationById(Long id);

    public Education updateEducation(Long id, Education toUpdate);

    public void deleteEducation(Long id);


}
