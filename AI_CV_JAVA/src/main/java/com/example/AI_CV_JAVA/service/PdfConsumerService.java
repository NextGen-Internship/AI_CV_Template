package com.example.AI_CV_JAVA.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfConsumerService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PdfConsumerService.class);
    private final PdfService pdfService;

    @RabbitListener(queues = "${rabbitmq.queue.listener}")
    public void consume(String message){
        LOGGER.info(String.format("Received message -> %s",message));
        pdfService.makeJson(message);
    }
}
