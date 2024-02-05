package com.example.AI_CV_JAVA.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/sendWS")
    public void sendMessage(){
        messagingTemplate.convertAndSend("topic/messages", "Hello");
    }

}
