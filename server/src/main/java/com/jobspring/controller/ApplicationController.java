package com.jobspring.controller;

import com.jobspring.model.Application;
import com.jobspring.model.Job;
import com.jobspring.model.User;
import com.jobspring.service.ApplicationService;
import com.jobspring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService service;
    private final UserService userService;

    public ApplicationController(ApplicationService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    // REQUIRES AUTHENTICATION - Create application for authenticated user and specific job
    @PostMapping("/job/{jobId}")
    public ResponseEntity<Application> createForJob(@PathVariable Long jobId, @RequestBody Application app) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email in our JWT implementation
        
        // Get user details and set as applicant
        User applicant = userService.getByEmail(email);
        app.setUser(applicant);
        app.setJob(Job.builder().id(jobId).build());
        
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - Admin functionality: Create application for specific user and job
    @PostMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<Application> createForUserAndJob(
            @PathVariable Long userId, 
            @PathVariable Long jobId, 
            @RequestBody Application app) {
        // Get authenticated user for audit
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        app.setUser(User.builder().id(userId).build());
        app.setJob(Job.builder().id(jobId).build());
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - General create (for flexibility)
    @PostMapping
    public ResponseEntity<Application> create(@RequestBody Application app) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - Get all applications (admin or user's own)
    @GetMapping
    public List<Application> list() {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.list();
    }

    // REQUIRES AUTHENTICATION - Get specific application
    @GetMapping("/{id}")
    public Application get(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.get(id);
    }

    // REQUIRES AUTHENTICATION - Get current user's applications
    @GetMapping("/my-applications")
    public List<Application> getMyApplications() {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email in our JWT implementation
        
        User user = userService.getByEmail(email);
        return service.listByUser(user.getId());
    }

    // REQUIRES AUTHENTICATION - Get applications by user ID (admin functionality)
    @GetMapping("/user/{userId}")
    public List<Application> listByUser(@PathVariable Long userId) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.listByUser(userId);
    }

    // PUBLIC - Get applications by job (employers can see who applied)
    @GetMapping("/job/{jobId}")
    public List<Application> listByJob(@PathVariable Long jobId) {
        return service.listByJob(jobId);
    }

    // REQUIRES AUTHENTICATION - Update application
    @PutMapping("/{id}")
    public Application update(@PathVariable Long id, @RequestBody Application patch) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.update(id, patch);
    }

    // REQUIRES AUTHENTICATION - Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
