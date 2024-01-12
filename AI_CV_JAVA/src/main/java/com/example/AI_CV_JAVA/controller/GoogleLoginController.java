package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.DTO.GoogleTokenRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleLoginController {

    @PostMapping("/process-google-token")
    public ResponseEntity<String> processGoogleToken(@RequestBody GoogleTokenRequest googleTokenRequest){

        String accessToken = googleTokenRequest.getAccessToken();

        System.out.println("Recieved Access Token: " + accessToken);

        return new ResponseEntity<>("Token received and processed successfully", HttpStatus.OK);
    }



}
