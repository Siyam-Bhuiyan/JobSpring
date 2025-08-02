package com.jobspring.jobservice.controller;

import com.jobspring.jobservice.dto.JobDTO;
import com.jobspring.jobservice.model.Job;
import com.jobspring.jobservice.repository.JobRepository;
import com.jobspring.jobservice.service.JobSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor  // ✅ Replaces @Autowired with final constructor injection
public class JobController {

    private final JobRepository jobRepository;
    private final JobSearchService jobSearchService;

    // 🔹 Create Job
    @PostMapping("/create")
    public String createJob(@RequestBody Job job) {
        jobRepository.save(job);
        return "Job posted successfully";
    }

    // 🔹 Get All Jobs
    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // 🔹 Get Job by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        try {
            Optional<Job> job = jobRepository.findById(id);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // 🔹 External Job Search (Adzuna, etc.)
    @GetMapping("/external")
    public List<JobDTO> getExternalJobs(@RequestParam String keyword, @RequestParam String location) {
        return jobSearchService.searchJobs(keyword, location);
    }
}
