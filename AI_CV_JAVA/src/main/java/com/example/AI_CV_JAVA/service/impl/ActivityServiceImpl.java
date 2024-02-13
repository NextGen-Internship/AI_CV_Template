package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Repo.ActivityRepository;
import com.example.AI_CV_JAVA.service.interfaces.ActivityService;
import com.example.AI_CV_JAVA.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;
    private final UserService userService;


    @Override
    public List<Activity> getUploadedCvs(){
        return activityRepository.findByType(userService.getCurrentUser().getId(),Type.Uploaded);
    }

    @Override
    public List<Activity> getSearchedCvs(){
        return activityRepository.findByType(userService.getCurrentUser().getId(),Type.Searched);
    }

    @Override
    public Activity crteateActivity(Person person, Type type){
        Activity activity = new Activity();
        activity.setPersonEmail(person.getEmail());
        activity.setType(type);
        activity.setCreatedDate(Instant.now());
//        activity.setUser(userService.getUserById(id).get());
        return activityRepository.saveAndFlush(activity);
    }
}
