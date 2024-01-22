package com.example.AI_CV_JAVA.controller;


import com.example.AI_CV_JAVA.DTO.UserDTO;
import com.example.AI_CV_JAVA.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/users/{id}")
    private ResponseEntity<UserDTO> getUserDetails(@PathVariable("id") int id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
