package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.DTO.PersonDto;
import com.example.AI_CV_JAVA.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/pdf")
@RequiredArgsConstructor
public class MultipartController {
    private final PdfService pdfService;

    @PostMapping("/upload")
    public CompletableFuture<ResponseEntity<PersonDto>> uploadFile(@RequestParam("file") MultipartFile file) {
        CompletableFuture<PersonDto> personDtoFuture = null;
        try {
            personDtoFuture = pdfService.upload(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return personDtoFuture.thenApplyAsync(ResponseEntity::ok)
                .exceptionally(e -> {
                    throw new RuntimeException(e);
                });
    }

}