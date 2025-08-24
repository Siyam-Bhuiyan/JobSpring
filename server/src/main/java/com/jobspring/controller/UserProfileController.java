package com.jobspring.controller;

import com.jobspring.model.User;
import com.jobspring.model.UserProfile;
import com.jobspring.service.UserProfileService;
import com.jobspring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class UserProfileController {
    
    private final UserProfileService profileService;
    private final UserService userService;
    
    /**
     * Get current user's profile
     */
    @GetMapping("/my-profile")
    public ResponseEntity<UserProfile> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        
        Optional<UserProfile> profile = profileService.getProfileByUserId(user.getId());
        
        if (profile.isPresent()) {
            return ResponseEntity.ok(profile.get());
        } else {
            // Return empty profile with user ID for frontend to handle
            UserProfile emptyProfile = UserProfile.builder()
                    .userId(user.getId())
                    .build();
            return ResponseEntity.ok(emptyProfile);
        }
    }
    
    /**
     * Get public profile by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserProfile> getPublicProfile(@PathVariable Long userId) {
        Optional<UserProfile> profile = profileService.getProfileByUserId(userId);
        
        if (profile.isPresent()) {
            // For public profiles, we might want to hide sensitive information
            UserProfile publicProfile = profile.get();
            // You can add logic here to hide private fields if needed
            return ResponseEntity.ok(publicProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Create or update current user's profile
     */
    @PutMapping("/my-profile")
    public ResponseEntity<UserProfile> updateMyProfile(@RequestBody UserProfile profileData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        
        UserProfile updatedProfile = profileService.createOrUpdateProfile(user.getId(), profileData);
        return ResponseEntity.ok(updatedProfile);
    }
    
    /**
     * Upload profile picture
     */
    @PostMapping("/my-profile/profile-picture")
    public ResponseEntity<UserProfile> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getByEmail(email);
            
            UserProfile updatedProfile = profileService.uploadProfilePicture(user.getId(), file);
            return ResponseEntity.ok(updatedProfile);
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Upload CV/Resume
     */
    @PostMapping("/my-profile/cv")
    public ResponseEntity<UserProfile> uploadCV(@RequestParam("file") MultipartFile file) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getByEmail(email);
            
            UserProfile updatedProfile = profileService.uploadCV(user.getId(), file);
            return ResponseEntity.ok(updatedProfile);
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Delete profile picture
     */
    @DeleteMapping("/my-profile/profile-picture")
    public ResponseEntity<UserProfile> deleteProfilePicture() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getByEmail(email);
            
            UserProfile updatedProfile = profileService.deleteProfilePicture(user.getId());
            return ResponseEntity.ok(updatedProfile);
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Delete CV
     */
    @DeleteMapping("/my-profile/cv")
    public ResponseEntity<UserProfile> deleteCV() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getByEmail(email);
            
            UserProfile updatedProfile = profileService.deleteCV(user.getId());
            return ResponseEntity.ok(updatedProfile);
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Delete entire profile
     */
    @DeleteMapping("/my-profile")
    public ResponseEntity<Void> deleteMyProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getByEmail(email);
            
            profileService.deleteProfile(user.getId());
            return ResponseEntity.ok().build();
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
