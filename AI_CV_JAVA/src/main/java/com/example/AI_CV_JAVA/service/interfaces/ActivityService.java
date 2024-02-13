package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.Entity.Activity;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.Entity.Person;

import java.util.List;

public interface ActivityService {
    List<Activity> getUploadedCvs();
    List<Activity> getSearchedCvs();
    Activity crteateActivity(Person person, Type type);
}
