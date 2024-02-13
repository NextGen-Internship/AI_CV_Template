package com.example.AI_CV_JAVA.service.interfaces;

import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.user.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(int id);
    User getCurrentUser();
}
