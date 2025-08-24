package com.jobspring.service;

import com.jobspring.model.User;
import com.jobspring.model.UserProfile;
import com.jobspring.repository.UserProfileRepository;
import com.jobspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserProfileService {
    
    private final UserProfileRepository repository;
    private final UserRepository userRepository;
    private final SupabaseStorageService storageService;
    
    /**
     * Get user profile by user ID
     */
    public Optional<UserProfile> getProfileByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
    
    /**
     * Create or update user profile
     */
    public UserProfile createOrUpdateProfile(Long userId, UserProfile profileData) {
        Optional<UserProfile> existingProfile = repository.findByUserId(userId);
        
        UserProfile profile;
        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
            updateProfileFields(profile, profileData);
        } else {
            // Need to fetch the User entity for the relationship
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            profile = UserProfile.builder()
                    .userId(userId)
                    .user(user)
                    .phone(profileData.getPhone())
                    .location(profileData.getLocation())
                    .university(profileData.getUniversity())
                    .degree(profileData.getDegree())
                    .graduationYear(profileData.getGraduationYear())
                    .experienceLevel(profileData.getExperienceLevel())
                    .skills(profileData.getSkills())
                    .bio(profileData.getBio())
                    .linkedinUrl(profileData.getLinkedinUrl())
                    .githubUrl(profileData.getGithubUrl())
                    .portfolioUrl(profileData.getPortfolioUrl())
                    .build();
        }
        
        return repository.save(profile);
    }
    
    /**
     * Upload profile picture
     */
    @Transactional
    public UserProfile uploadProfilePicture(Long userId, MultipartFile file) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }
        
        // Retry logic for optimistic locking
        for (int attempt = 0; attempt < 3; attempt++) {
            try {
                // Get or create profile (fresh load for each attempt)
                UserProfile profile = getProfileByUserId(userId)
                        .orElseGet(() -> {
                            // Need to fetch the User entity for the relationship
                            User user = userRepository.findById(userId)
                                    .orElseThrow(() -> new RuntimeException("User not found"));
                            return UserProfile.builder()
                                    .userId(userId)
                                    .user(user)
                                    .build();
                        });
                
                // Delete existing profile picture if exists
                if (profile.getProfilePictureUrl() != null) {
                    String oldFileName = storageService.extractFileNameFromUrl(profile.getProfilePictureUrl());
                    if (oldFileName != null) {
                        try {
                            storageService.deleteProfilePicture(oldFileName);
                        } catch (IOException e) {
                            // Log error but continue with upload
                            System.err.println("Failed to delete old profile picture: " + e.getMessage());
                        }
                    }
                }
                
                // Generate unique filename
                String fileName = storageService.generateFileName(
                        file.getOriginalFilename(), 
                        userId, 
                        "profile"
                );
                
                // Upload to Supabase
                String fileUrl = storageService.uploadProfilePicture(
                        file.getBytes(), 
                        fileName, 
                        file.getContentType()
                );
                
                // Update profile
                profile.setProfilePictureUrl(fileUrl);
                
                return repository.save(profile);
                
            } catch (org.springframework.orm.ObjectOptimisticLockingFailureException e) {
                if (attempt == 2) { // Last attempt
                    throw new RuntimeException("Failed to update profile after multiple attempts due to concurrent modifications", e);
                }
                // Wait briefly before retry
                try {
                    Thread.sleep(100);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Upload interrupted", ie);
                }
            }
        }
        
        throw new RuntimeException("Unexpected error in upload retry logic");
    }
    
    /**
     * Upload CV/Resume
     */
    @Transactional
    public UserProfile uploadCV(Long userId, MultipartFile file) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }
        
        if (!"application/pdf".equals(file.getContentType())) {
            throw new IOException("Only PDF files are allowed for CV upload");
        }
        
        // Retry logic for optimistic locking
        for (int attempt = 0; attempt < 3; attempt++) {
            try {
                // Get or create profile (fresh load for each attempt)
                UserProfile profile = getProfileByUserId(userId)
                        .orElseGet(() -> {
                            // Need to fetch the User entity for the relationship
                            User user = userRepository.findById(userId)
                                    .orElseThrow(() -> new RuntimeException("User not found"));
                            return UserProfile.builder()
                                    .userId(userId)
                                    .user(user)
                                    .build();
                        });
                
                // Delete existing CV if exists
                if (profile.getCvUrl() != null) {
                    String oldFileName = storageService.extractFileNameFromUrl(profile.getCvUrl());
                    if (oldFileName != null) {
                        try {
                            storageService.deleteFile(oldFileName);
                        } catch (IOException e) {
                            // Log error but continue with upload
                            System.err.println("Failed to delete old CV: " + e.getMessage());
                        }
                    }
                }
                
                // Generate unique filename
                String fileName = storageService.generateFileName(
                        file.getOriginalFilename(), 
                        userId, 
                        "cv"
                );
                
                // Upload to Supabase
                String fileUrl = storageService.uploadFile(
                        file.getBytes(), 
                        fileName, 
                        file.getContentType()
                );
                
                // Update profile
                profile.setCvUrl(fileUrl);
                profile.setCvFileName(file.getOriginalFilename());
                
                return repository.save(profile);
                
            } catch (org.springframework.orm.ObjectOptimisticLockingFailureException e) {
                if (attempt == 2) { // Last attempt
                    throw new RuntimeException("Failed to update profile after multiple attempts due to concurrent modifications", e);
                }
                // Wait briefly before retry
                try {
                    Thread.sleep(100);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Upload interrupted", ie);
                }
            }
        }
        
        throw new RuntimeException("Unexpected error in upload retry logic");
    }
    
    /**
     * Delete profile picture
     */
    public UserProfile deleteProfilePicture(Long userId) throws IOException {
        UserProfile profile = getProfileByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
        
        if (profile.getProfilePictureUrl() != null) {
            String fileName = storageService.extractFileNameFromUrl(profile.getProfilePictureUrl());
            if (fileName != null) {
                storageService.deleteProfilePicture(fileName);
            }
            profile.setProfilePictureUrl(null);
            repository.save(profile);
        }
        
        return profile;
    }
    
    /**
     * Delete CV
     */
    public UserProfile deleteCV(Long userId) throws IOException {
        UserProfile profile = getProfileByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
        
        if (profile.getCvUrl() != null) {
            String fileName = storageService.extractFileNameFromUrl(profile.getCvUrl());
            if (fileName != null) {
                storageService.deleteFile(fileName);
            }
            profile.setCvUrl(null);
            profile.setCvFileName(null);
            repository.save(profile);
        }
        
        return profile;
    }
    
    /**
     * Delete entire profile
     */
    public void deleteProfile(Long userId) throws IOException {
        Optional<UserProfile> profileOpt = getProfileByUserId(userId);
        if (profileOpt.isPresent()) {
            UserProfile profile = profileOpt.get();
            
            // Delete files from Supabase
            if (profile.getProfilePictureUrl() != null) {
                String fileName = storageService.extractFileNameFromUrl(profile.getProfilePictureUrl());
                if (fileName != null) {
                    try {
                        storageService.deleteProfilePicture(fileName);
                    } catch (IOException e) {
                        System.err.println("Failed to delete profile picture: " + e.getMessage());
                    }
                }
            }
            
            if (profile.getCvUrl() != null) {
                String fileName = storageService.extractFileNameFromUrl(profile.getCvUrl());
                if (fileName != null) {
                    try {
                        storageService.deleteFile(fileName);
                    } catch (IOException e) {
                        System.err.println("Failed to delete CV: " + e.getMessage());
                    }
                }
            }
            
            // Delete profile from database
            repository.deleteByUserId(userId);
        }
    }
    
    /**
     * Helper method to update profile fields
     */
    private void updateProfileFields(UserProfile existingProfile, UserProfile newData) {
        if (newData.getPhone() != null) existingProfile.setPhone(newData.getPhone());
        if (newData.getLocation() != null) existingProfile.setLocation(newData.getLocation());
        if (newData.getUniversity() != null) existingProfile.setUniversity(newData.getUniversity());
        if (newData.getDegree() != null) existingProfile.setDegree(newData.getDegree());
        if (newData.getGraduationYear() != null) existingProfile.setGraduationYear(newData.getGraduationYear());
        if (newData.getExperienceLevel() != null) existingProfile.setExperienceLevel(newData.getExperienceLevel());
        if (newData.getSkills() != null) existingProfile.setSkills(newData.getSkills());
        if (newData.getBio() != null) existingProfile.setBio(newData.getBio());
        if (newData.getLinkedinUrl() != null) existingProfile.setLinkedinUrl(newData.getLinkedinUrl());
        if (newData.getGithubUrl() != null) existingProfile.setGithubUrl(newData.getGithubUrl());
        if (newData.getPortfolioUrl() != null) existingProfile.setPortfolioUrl(newData.getPortfolioUrl());
    }
}
