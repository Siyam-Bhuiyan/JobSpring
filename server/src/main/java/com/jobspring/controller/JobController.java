package com.jobspring.controller;

import com.jobspring.model.Company;
import com.jobspring.model.Job;
import com.jobspring.service.JobService;
import org.springframework.http.ResponseEntity;
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

    // Frontend-friendly: company ID from URL
    @PostMapping("/company/{companyId}")
    public ResponseEntity<Job> createForCompany(@PathVariable Long companyId, @RequestBody Job job) {
        job.setCompany(Company.builder().id(companyId).build());
        Job created = service.create(job);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.getId())).body(created);
    }

    // (Optional) Original create kept for flexibility
    @PostMapping
    public ResponseEntity<Job> create(@RequestBody Job job) {
        Job created = service.create(job);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.getId())).body(created);
    }

    @GetMapping
    public List<Job> list() { return service.list(); }

    @GetMapping("/{id}")
    public Job get(@PathVariable Long id) { return service.get(id); }

    @GetMapping("/company/{companyId}")
    public List<Job> listByCompany(@PathVariable Long companyId) {
        return service.listByCompany(companyId);
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
