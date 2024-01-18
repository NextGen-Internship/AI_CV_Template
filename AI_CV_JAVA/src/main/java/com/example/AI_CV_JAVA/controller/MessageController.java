package com.example.AI_CV_JAVA.controller;

import com.example.AI_CV_JAVA.service.PdfConsumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.AI_CV_JAVA.service.PdfPublisherService;

@RestController
@RequestMapping("/api/v1")
public class MessageController {

    private final PdfPublisherService producer;
    private final PdfConsumerService consumer;

    @Autowired
    public MessageController(PdfPublisherService producer, PdfConsumerService consumer) {
        this.producer = producer;
        this.consumer = consumer;
    }

    @GetMapping("/publish")
    public ResponseEntity<String> sendMessage(@RequestBody String message){
        producer.sendMessage(message);
        return ResponseEntity.ok("Message sent");
    }



}