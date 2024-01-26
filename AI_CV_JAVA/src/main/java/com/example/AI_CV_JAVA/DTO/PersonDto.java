package com.example.AI_CV_JAVA.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonDto {
    private String name;
    private String summary;
    private List<TechnologyDto> technologies;
    private List<ExperienceDto> experience;
    private List<EducationDto> education;
}
