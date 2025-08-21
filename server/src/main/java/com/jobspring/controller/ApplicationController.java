package com.jobspring.controller;

import com.jobspring.model.Application;
import com.jobspring.model.Job;
import com.jobspring.model.User;
import com.jobspring.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    // Frontend-friendly: user and job IDs from URL
    @PostMapping("/user/{userId}/job/{jobId}")
    public ResponseEntity<Application> createForUserAndJob(
            @PathVariable Long userId, 
            @PathVariable Long jobId, 
            @RequestBody Application app) {
        app.setUser(User.builder().id(userId).build());
        app.setJob(Job.builder().id(jobId).build());
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    // Alternative: only job ID from URL (user from auth later)
    @PostMapping("/job/{jobId}")
    public ResponseEntity<Application> createForJob(@PathVariable Long jobId, @RequestBody Application app) {
        app.setJob(Job.builder().id(jobId).build());
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    // (Optional) Original create kept for flexibility
    @PostMapping
    public ResponseEntity<Application> create(@RequestBody Application app) {
        Application created = service.create(app);
        return ResponseEntity.created(URI.create("/api/applications/" + created.getId())).body(created);
    }

    @GetMapping
    public List<Application> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Application get(@PathVariable Long id) {
        return service.get(id);
    }

    @GetMapping("/user/{userId}")
    public List<Application> listByUser(@PathVariable Long userId) {
        return service.listByUser(userId);
    }

    @GetMapping("/job/{jobId}")
    public List<Application> listByJob(@PathVariable Long jobId) {
        return service.listByJob(jobId);
    }

    @PutMapping("/{id}")
    public Application update(@PathVariable Long id, @RequestBody Application patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
