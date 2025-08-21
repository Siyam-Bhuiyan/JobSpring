package com.jobspring.service;

import com.jobspring.enums.ApplicationStatus;
import com.jobspring.model.Application;
import com.jobspring.model.Job;
import com.jobspring.model.User;
import com.jobspring.repository.ApplicationRepository;
import com.jobspring.repository.JobRepository;
import com.jobspring.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ApplicationService {

    private final ApplicationRepository appRepo;
    private final UserRepository userRepo;
    private final JobRepository jobRepo;

    public ApplicationService(ApplicationRepository appRepo, UserRepository userRepo, JobRepository jobRepo) {
        this.appRepo = appRepo;
        this.userRepo = userRepo;
        this.jobRepo = jobRepo;
    }

    public Application create(Application a) {
        if (a.getUser() == null || a.getUser().getId() == null)
            throw new IllegalArgumentException("userId is required");
        if (a.getJob() == null || a.getJob().getId() == null)
            throw new IllegalArgumentException("jobId is required");

        Long userId = a.getUser().getId();
        Long jobId = a.getJob().getId();

        if (appRepo.existsByUser_IdAndJob_Id(userId, jobId))
            throw new IllegalArgumentException("already applied to this job");

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("user not found"));
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("job not found"));

        a.setUser(user);
        a.setJob(job);

        String status = ApplicationStatus.isValid(a.getStatus())
                ? ApplicationStatus.normalize(a.getStatus())
                : "applied";
        a.setStatus(status);

        return appRepo.save(a);
    }

    @Transactional(readOnly = true)
    public List<Application> list() {
        return appRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Application get(Long id) {
        return appRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("application not found"));
    }

    @Transactional(readOnly = true)
    public List<Application> listByUser(Long userId) {
        return appRepo.findByUser_Id(userId);
    }

    @Transactional(readOnly = true)
    public List<Application> listByJob(Long jobId) {
        return appRepo.findByJob_Id(jobId);
    }

    public Application update(Long id, Application patch) {
        Application existing = get(id);

        if (patch.getStatus() != null && ApplicationStatus.isValid(patch.getStatus())) {
            existing.setStatus(ApplicationStatus.normalize(patch.getStatus()));
        }
        if (patch.getCoverLetter() != null) {
            existing.setCoverLetter(patch.getCoverLetter());
        }
        if (patch.getUser() != null && patch.getUser().getId() != null) {
            User user = userRepo.findById(patch.getUser().getId())
                    .orElseThrow(() -> new IllegalArgumentException("user not found"));
            existing.setUser(user);
        }
        if (patch.getJob() != null && patch.getJob().getId() != null) {
            Job job = jobRepo.findById(patch.getJob().getId())
                    .orElseThrow(() -> new IllegalArgumentException("job not found"));
            // if user+job combination changes, ensure uniqueness
            Long newUserId = existing.getUser().getId();
            Long newJobId = job.getId();
            if (!existing.getJob().getId().equals(newJobId) &&
                appRepo.existsByUser_IdAndJob_Id(newUserId, newJobId)) {
                throw new IllegalArgumentException("already applied to this job");
            }
            existing.setJob(job);
        }

        return appRepo.save(existing);
    }

    public void delete(Long id) {
        appRepo.delete(get(id));
    }
}
