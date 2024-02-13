package com.example.AI_CV_JAVA.service.impl;

import com.example.AI_CV_JAVA.DTO.NotificationDto;
import com.example.AI_CV_JAVA.Entity.Education;
import com.example.AI_CV_JAVA.Entity.Enum.Type;
import com.example.AI_CV_JAVA.Entity.Experience;
import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.Entity.Technology;
import com.example.AI_CV_JAVA.controller.WebSocketController;
import com.example.AI_CV_JAVA.service.impl.PdfPublisherServiceImpl;
import com.example.AI_CV_JAVA.service.interfaces.*;
import com.example.AI_CV_JAVA.user.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {
    private final PdfPublisherService producer;
    private final PersonService personService;
    private final WebSocketController webSocketController;
    private final ActivityService activityService;
    private final UserService userService;


    public List<Experience> mapExperiences(JsonNode experiencesNode) {
        List<Experience> experiences = new ArrayList<>();
        for (JsonNode experienceNode : experiencesNode) {
            Experience experience = new Experience();
            experience.setCompanyName(experienceNode.path("company").asText());
            experience.setRole(experienceNode.path("role").asText());
            experience.setStartYear(experienceNode.path("start_year").asText());
            if (experienceNode.path("end_year").isNull()) {
                experience.setEndYear("Present");
            } else {
                experience.setEndYear(experienceNode.path("end_year").asText());
            }
            experience.setDescription(experienceNode.path("description").asText());
            experiences.add(experience);
        }
        return experiences;
    }

    public Person makePerson(String jsonMessage) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonMessage);
        Person person = new Person();
        person.setName(jsonNode.path("name").asText());
        person.setSummary(jsonNode.path("summary").asText());
        person.setTechnologies(mapTechnologies(jsonNode.path("technologies")));
        person.setExperience(mapExperiences(jsonNode.path("experience")));
        person.setEducation(mapEducation(jsonNode.path("education")));
        person.setEmail(jsonNode.path("gmail").asText());
        return person;
    }

    public List<Education> mapEducation(JsonNode education) {
        List<Education> educations = new ArrayList<>();
        for (JsonNode jsonNode : education) {
            Education education1 = new Education();
            education1.setDegree(jsonNode.path("degree").asText());
            education1.setCollege(jsonNode.path("college").asText());
            education1.setStartYear(jsonNode.path("start_year").asText());
            education1.setEndYear(jsonNode.path("end_year").asText());
            educations.add(education1);
        }
        return educations;
    }

    public List<Technology> mapTechnologies(JsonNode technologiesNode) {
        List<Technology> technologies = new ArrayList<>();
        for (JsonNode technologyNode : technologiesNode) {
            Technology technology = new Technology();
            technology.setName(technologyNode.asText());
            technologies.add(technology);
        }
        return technologies;
    }

    public void readJson(String message) throws Exception {
        Person person = makePerson(message);
        personService.savePerson(person);
        User user = userService.getCurrentUser();
        System.out.println(user.getId());
        user.getActivities().add(activityService.crteateActivity(person, Type.Uploaded));
        String email = person.getEmail();
        NotificationDto notification = new NotificationDto();
        notification.setEmail(email);
        webSocketController.sendMessage(notification);
    }

    public void upload(MultipartFile file, String gmail) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        String textToSend = text + "Blankfactor gmail: " + gmail;
        document.close();
        producer.sendMessage(textToSend);
    }

}