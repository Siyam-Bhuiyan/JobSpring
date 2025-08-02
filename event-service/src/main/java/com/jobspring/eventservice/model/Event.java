package com.jobspring.eventservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String category; // e.g. webinar, competition, hackathon

    private String organizer;

    private LocalDate date;

    private LocalTime time;

    private String imageUrl;

    private String link;
}
