package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.auth.AuthenticationResponse;
import com.example.AI_CV_JAVA.service.GoogleLoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;

    public GoogleLoginController(GoogleLoginService googleLoginService) {
        this.googleLoginService = googleLoginService;
    }

    @PostMapping("/process-google-token")
    public AuthenticationResponse processGoogleToken(@RequestBody String googleToken) {
        return googleLoginService.processGoogleToken(googleToken);
    }
}



