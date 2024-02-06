package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.DTO.PersonDto;
import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.security.JwtService;
import com.example.AI_CV_JAVA.service.impl.PdfServiceImpl;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/pdf")
@RequiredArgsConstructor
public class MultipartController {
    private final PdfServiceImpl pdfService;
    private final JwtService jwtService;
    private final PersonService personService;
    private final UserDetailsService userDetailsService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        CompletableFuture<PersonDto> personDtoFuture = null;
        try {
            pdfService.upload(file);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("File successfully uploaded");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getCVById(
            @PathVariable Long id

    ) {
        Optional<Person> person = personService.findById(id);
        System.out.println(person.toString());
        return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }

}