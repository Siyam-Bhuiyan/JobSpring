package com.jobspring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    
    @Id
    private Long userId; // One-to-one with User
    
    @Column(length = 20)
    private String phone;
    
    @Column(length = 100)
    private String location;
    
    @Column(length = 100)
    private String university;
    
    @Column(length = 100)
    private String degree;
    
    @Column(length = 10)
    private String graduationYear;
    
    @Column(length = 20)
    private String experienceLevel; // "fresher", "1-2 years", "3-5 years", etc.
    
    @Column(columnDefinition = "TEXT")
    private String skills; // JSON array of skills
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(length = 255)
    private String linkedinUrl;
    
    @Column(length = 255)
    private String githubUrl;
    
    @Column(length = 255)
    private String portfolioUrl;
    
    @Column(length = 500)
    private String profilePictureUrl; // Supabase URL
    
    @Column(length = 500)
    private String cvUrl; // Supabase URL for CV/Resume
    
    @Column(length = 100)
    private String cvFileName; // Original filename
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @MapsId
    private User user;
}
