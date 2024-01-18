package com.example.AI_CV_JAVA.config;


import com.rabbitmq.client.AMQP;
import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.queue.name}")
    private String queue;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key}")
    private String routing_key;

    @Value("${rabbitmq.queue.listener}")
    private String rabbitmq_queue_listener;
    @Bean
    public Queue queue(){
        return new Queue(queue,true);
    }
    @Bean
    public Queue pythonqueue(){
        return new Queue(rabbitmq_queue_listener, true);
    }
    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(exchange);
    }
    @Bean
    public Binding binding(){
        return BindingBuilder.bind(queue())
                .to(exchange())
                .with(routing_key);
    }
}
