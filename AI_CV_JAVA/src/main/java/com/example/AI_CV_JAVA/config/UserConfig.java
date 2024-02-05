package com.example.AI_CV_JAVA.config;

import com.example.AI_CV_JAVA.service.impl.UserServiceImpl;
import com.example.AI_CV_JAVA.service.interfaces.UserService;
import com.example.AI_CV_JAVA.user.UserDao;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class UserConfig {

    private final UserDao userRepo;

    @Bean
    public UserService userBean() {
        return new UserServiceImpl(userRepo, modelMapperBean());
    }

    @Bean
    public ModelMapper modelMapperBean() {
        return new ModelMapper();
    }
}

