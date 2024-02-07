package com.example.AI_CV_JAVA.Entity;

import jakarta.persistence.*;
import jakarta.validation.groups.Default;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email", nullable = true)
    private String email;

    @Column
    private String name;

    @Column
    private String summary;

    @Column
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Technology> technologies;

    @Column
    @OneToMany(cascade = CascadeType.ALL)
    private List<Experience> experience;

    @Column
    @OneToMany(cascade = CascadeType.ALL)
    private List<Education> education;
}
