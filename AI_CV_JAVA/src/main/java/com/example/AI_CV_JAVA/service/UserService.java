package com.example.AI_CV_JAVA.service;

import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.user.User;
import com.example.AI_CV_JAVA.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper mapper;

    public UserDTO getUserById(int id) {
        Optional<User> user = userRepo.findById(id);
        return mapper.map(user, UserDTO.class);
    }

}
