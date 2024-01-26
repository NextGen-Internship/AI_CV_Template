package com.example.AI_CV_JAVA.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class EducationDto {
    private long id;
    private String degree;
    private String college;
    private String startYear;
    private String endYear;
}