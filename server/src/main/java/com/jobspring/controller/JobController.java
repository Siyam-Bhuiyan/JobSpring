package com.jobspring.controller;

import com.jobspring.model.Company;
import com.jobspring.model.Job;
import com.jobspring.model.User;
import com.jobspring.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    // Frontend-friendly: company ID from URL - REQUIRES AUTHENTICATION
    @PostMapping("/company/{companyId}")
    public ResponseEntity<Job> createForCompany(@PathVariable Long companyId, @RequestBody Job job) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        job.setCompany(Company.builder().id(companyId).build());
        Job created = service.create(job);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.getId())).body(created);
    }

    // (Optional) Original create kept for flexibility - REQUIRES AUTHENTICATION
    @PostMapping
    public ResponseEntity<Job> create(@RequestBody Job job) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Job created = service.create(job);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.getId())).body(created);
    }

    // PUBLIC - Anyone can view jobs
    @GetMapping
    public List<Job> list() { return service.list(); }

    // PUBLIC - Anyone can view a specific job
    @GetMapping("/{id}")
    public Job get(@PathVariable Long id) { return service.get(id); }

    // PUBLIC - Anyone can view jobs by company
    @GetMapping("/company/{companyId}")
    public List<Job> listByCompany(@PathVariable Long companyId) {
        return service.listByCompany(companyId);
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can update jobs
    // REQUIRES AUTHENTICATION - Only authenticated users can update jobs
    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job patch) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.update(id, patch);
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can delete jobs
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
