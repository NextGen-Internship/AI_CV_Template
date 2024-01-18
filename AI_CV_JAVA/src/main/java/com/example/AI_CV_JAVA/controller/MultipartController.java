package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/pdf") // Define the base path here
@RequiredArgsConstructor
public class MultipartController {

    private final PdfService pdfService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            pdfService.upload(file);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error during file upload");
        }
        return ResponseEntity.ok("file uploaded successfully");
    }
}