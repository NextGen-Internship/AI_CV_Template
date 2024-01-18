package com.example.AI_CV_JAVA.service;

import com.example.AI_CV_JAVA.security.JwtService;
import com.example.AI_CV_JAVA.user.User;
import com.example.AI_CV_JAVA.user.UserRepository;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.jackson2.JacksonFactory;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class GoogleLoginService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    public ResponseEntity<String> processGoogleToken(String googleToken) {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        NetHttpTransport transport = new NetHttpTransport();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList("882008211267-hm9q7m1g6ogig1j1nj1kug0tju1a96i4.apps.googleusercontent.com"))
                .build();

        // (Receive idTokenString by HTTPS POST)
        String idTokenString = googleToken;
        System.out.println(idTokenString);

        String jwtToken = "";

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            System.out.println("Id token string: " + idTokenString);
            System.out.println("Google id Token object " + idToken.getPayload());
            Payload payload = idToken.getPayload();

            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            //Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            // Use or store profile information
            User user = new User();
            user.setFirstname(givenName);
            user.setLastname(familyName);
            user.setPictureUrl(pictureUrl);
            user.setEmail(email);

            Optional<User> existingUser = userRepository.findByEmail(email);
            if(existingUser.isPresent()){
               jwtToken = jwtService.generateToken(user);
                return new ResponseEntity<>("User already exists", HttpStatus.OK);
            }

            userRepository.save(user);
            jwtToken = jwtService.generateToken(user);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing Google Id token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }
}