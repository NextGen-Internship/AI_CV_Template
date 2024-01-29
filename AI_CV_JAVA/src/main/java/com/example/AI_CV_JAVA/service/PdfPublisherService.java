package com.example.AI_CV_JAVA.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PdfPublisherService {
    private final AmqpTemplate rabbitTemplate;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public void sendMessage(String pdf) {

        log.info("MESSAGE SENT");
        rabbitTemplate.convertAndSend(exchange, routingKey, pdf);
    }
}