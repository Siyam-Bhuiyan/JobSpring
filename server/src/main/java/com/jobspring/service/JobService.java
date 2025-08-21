package com.jobspring.service;

import com.jobspring.model.Company;
import com.jobspring.model.Job;
import com.jobspring.repository.CompanyRepository;
import com.jobspring.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobService {

    private final JobRepository jobRepo;
    private final CompanyRepository companyRepo;

    public JobService(JobRepository jobRepo, CompanyRepository companyRepo) {
        this.jobRepo = jobRepo;
        this.companyRepo = companyRepo;
    }

    public Job create(Job j) {
        if (j.getTitle() == null) throw new IllegalArgumentException("title is required");
        if (j.getCompany() == null || j.getCompany().getId() == null)
            throw new IllegalArgumentException("companyId is required");
        Company company = companyRepo.findById(j.getCompany().getId())
                .orElseThrow(() -> new IllegalArgumentException("company not found"));
        j.setCompany(company); // attach managed entity
        return jobRepo.save(j);
    }

    public List<Job> list() { return jobRepo.findAll(); }

    public Job get(Long id) {
        return jobRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("job not found"));
    }

    public List<Job> listByCompany(Long companyId) {
        return jobRepo.findByCompany_Id(companyId);
    }

    public Job update(Long id, Job patch) {
        Job existing = get(id);
        if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
        if (patch.getDescription() != null) existing.setDescription(patch.getDescription());
        if (patch.getLocation() != null) existing.setLocation(patch.getLocation());
        if (patch.getResponsibilities() != null) existing.setResponsibilities(patch.getResponsibilities());
        if (patch.getQualifications() != null) existing.setQualifications(patch.getQualifications());
        if (patch.getSkills() != null) existing.setSkills(patch.getSkills());
        if (patch.getCompany() != null && patch.getCompany().getId() != null) {
            Company company = companyRepo.findById(patch.getCompany().getId())
                    .orElseThrow(() -> new IllegalArgumentException("company not found"));
            existing.setCompany(company);
        }
        return jobRepo.save(existing);
    }

    public void delete(Long id) { jobRepo.delete(get(id)); }
}
