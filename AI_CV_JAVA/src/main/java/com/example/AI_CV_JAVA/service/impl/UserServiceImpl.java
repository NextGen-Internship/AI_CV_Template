package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.Repo.UserRepository;
import com.example.AI_CV_JAVA.service.interfaces.UserService;
import com.example.AI_CV_JAVA.user.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final ModelMapper mapper;

    @Override
    public UserDTO getUserById(int id) {
        Optional<User> user = userRepo.findById(id);
        return mapper.map(user, UserDTO.class);
    }
}
