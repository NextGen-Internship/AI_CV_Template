package com.example.AI_CV_JAVA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.AI_CV_JAVA.service.PdfPublisherService;

@RestController
@RequestMapping("/api/v1")
public class MessageController {

    private final PdfPublisherService producer;

    @Autowired
    public MessageController(PdfPublisherService producer) {
        this.producer = producer;
    }

    @GetMapping("/publish")
    public ResponseEntity<String> sendMessage(@RequestParam("message") String message){
        producer.sendMessage(message);
        return ResponseEntity.ok("Message sent");
    }
}