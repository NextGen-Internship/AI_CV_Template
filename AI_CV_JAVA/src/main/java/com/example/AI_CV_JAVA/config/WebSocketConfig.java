package com.example.AI_CV_JAVA.config;

import com.example.AI_CV_JAVA.controller.CustomWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer  {
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config){
//        config.enableSimpleBroker("/topic");
//        config.setApplicationDestinationPrefixes("/app");
//    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/ws")
                    .setAllowedOrigins("*").withSockJS();
        }

    @Override
        public void configureMessageBroker(MessageBrokerRegistry config){
            config.enableSimpleBroker("/topic/", "/queue/");
            config.setApplicationDestinationPrefixes("/app");
        }

//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry){
//        registry.addEndpoint("/ws")
//                .setAllowedOriginPatterns("*")
//                .withSockJS();
//    }
//@Override
//public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//    registry.addHandler(new CustomWebSocketHandler(), "/ws")
//            .setAllowedOrigins("*");
//
//}

//    Configuration
//    @EnableWebSocketMessageBroker
//    public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//        @Override
//        public void registerStompEndpoints(StompEndpointRegistry
//                                                   registry) {
//            registry.addEndpoint("/mywebsockets")
//                    .setAllowedOrigins("mydomain.com").withSockJS();
//        }
//
//        @Override
//        public void configureMessageBroker(MessageBrokerRegistry config){
//            config.enableSimpleBroker("/topic/", "/queue/");
//            config.setApplicationDestinationPrefixes("/app");
//        }
//    }
}
