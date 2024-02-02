package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.Repo.EducationDao;
import com.example.AI_CV_JAVA.service.interfaces.EducationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {
    private final EducationDao educationDao;

    public Education saveEducation(Education education){
        return educationDao.saveAndFlush(education);
    }

    public List<Education> getAllEducations(){
        return educationDao.findAll();
    }

    public Optional<Education> getEducationById(Long id){
        return educationDao.findById(id);
    }

    public Education updateEducation(Long id, Education toUpdate){
        Optional<Education> existingEducation = educationDao.findById(id);
        if (existingEducation.isPresent()){
            toUpdate.setId(id);
            return educationDao.save(toUpdate);
        }
        return null;
    }

    public void deleteEducation(Long id){
        educationDao.deleteById(id);
    }
}
