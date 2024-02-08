package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.Repo.TechnologyDao;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import com.example.AI_CV_JAVA.service.interfaces.TechnologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TechnologyServiceImpl implements TechnologyService {
    private final TechnologyDao technologyDao;
    private final PersonService personService;

    public Technology saveTechnology(Technology technology) {
        return technologyDao.saveAndFlush(technology);
    }

    public List<Technology> getAllTechnologies() {
        return technologyDao.findAll();
    }

    public Optional<Technology> getTechnologyById(Long id) {
        return technologyDao.findById(id);
    }

    public Technology updateTechnology(Long id, Technology toUpdateTechnology) {
        Optional<Technology> existingTechnology = technologyDao.findById(id);
        if (existingTechnology.isPresent()) {
            toUpdateTechnology.setId(id);
            return technologyDao.save(toUpdateTechnology);
        }
        return null;
    }

    public void deleteTechnology(Long id) {
        technologyDao.deleteById(id);
    }

    @Override
    public boolean addTechnology(String name, long personId) {
        Optional<Technology> technology = technologyDao.findByName(name);
        if (technology.isEmpty()) {
            Technology technology1 = new Technology();
            technology1.setName(name);
            personService.addTechnology(technologyDao.saveAndFlush(technology1), personId);
        }else {
            personService.addTechnology(technology.get(), personId);
        }
        return true;
        }
    }





