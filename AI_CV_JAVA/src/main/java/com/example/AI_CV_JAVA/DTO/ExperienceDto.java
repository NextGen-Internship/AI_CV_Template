package com.example.AI_CV_JAVA.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceDto {
    private long id;
    private String companyName;
    private String role;
    private String startYear;
    private String endYear;
    private String description;
}