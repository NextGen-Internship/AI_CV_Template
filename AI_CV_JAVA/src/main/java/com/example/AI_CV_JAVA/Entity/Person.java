package com.example.AI_CV_JAVA.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "people")
@Entity
public class Person {

    @Id
    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String summary;

    @Column
    @ManyToMany
    private List<Technology> technologies;

    @Column
    @OneToMany
    private List<Experience> experience;

    @Column
    @OneToMany
    private List<Education> education;
}
