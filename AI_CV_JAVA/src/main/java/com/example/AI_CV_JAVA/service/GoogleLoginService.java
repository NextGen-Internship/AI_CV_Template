package com.example.AI_CV_JAVA.service;

import com.example.AI_CV_JAVA.security.JwtService;
import com.example.AI_CV_JAVA.user.User;
import com.example.AI_CV_JAVA.user.UserRepository;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class GoogleLoginService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public ResponseEntity<String> processGoogleToken(String googleToken) {
        try {
            GoogleIdToken idToken = verifyGoogleToken(googleToken);
            Payload payload = idToken.getPayload();

            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            User user = extractUserFromPayload(payload);

            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return new ResponseEntity<>("User already exists", HttpStatus.OK);
            }

            userRepository.save(user);
            String jwtToken = jwtService.generateToken(user);

            return new ResponseEntity<>(jwtToken, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing Google Id token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private GoogleIdToken verifyGoogleToken(String googleToken) throws Exception {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        NetHttpTransport transport = new NetHttpTransport();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList("882008211267-hm9q7m1g6ogig1j1nj1kug0tju1a96i4.apps.googleusercontent.com"))
                .build();

        return verifier.verify(googleToken);
    }

    private User extractUserFromPayload(Payload payload) {
        String email = payload.getEmail();
        String givenName = (String) payload.get("given_name");
        String familyName = (String) payload.get("family_name");
        String pictureUrl = (String) payload.get("picture");

        User user = new User();
        user.setFirstname(givenName);
        user.setLastname(familyName);
        user.setPictureUrl(pictureUrl);
        user.setEmail(email);

        return user;
    }
}