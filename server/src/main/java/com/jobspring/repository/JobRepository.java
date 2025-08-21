package com.jobspring.repository;

import com.jobspring.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompany_Id(Long companyId);
}
