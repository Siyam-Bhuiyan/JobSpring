package com.jobspring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // sender username (could also be a relation with User entity if needed)
    @Column(nullable = false)
    private String senderUsername;

    // receiver username (could also be null for public chat)
    @Column(nullable = true)
    private String receiverUsername;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // e.g. "PRIVATE", "ROOM"
    @Column(nullable = false)
    private String type;

    private String room; // for chat rooms

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
