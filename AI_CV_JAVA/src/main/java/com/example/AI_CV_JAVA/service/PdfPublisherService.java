package com.example.AI_CV_JAVA.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PdfPublisherService {

    private  final Logger LOGGER = LoggerFactory.getLogger(PdfPublisherService.class);
    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    private final AmqpTemplate rabbitTemplate;

//    @Autowired
//    public PdfPublisherService(RabbitTemplate rabbitTemplate) {
//        this.rabbitTemplate = rabbitTemplate;
//    }this

    public void sendMessage(String pdf){

        LOGGER.info("MESSAGE SENT");
        rabbitTemplate.convertAndSend(exchange,routingKey,pdf);
    }
}
