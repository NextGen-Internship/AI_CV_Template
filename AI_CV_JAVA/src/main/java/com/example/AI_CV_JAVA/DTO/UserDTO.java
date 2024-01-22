package com.example.AI_CV_JAVA.DTO;


import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private int id;

    private String firstname;

    private String lastname;

    private String email;

    private String pictureUrl;
}
