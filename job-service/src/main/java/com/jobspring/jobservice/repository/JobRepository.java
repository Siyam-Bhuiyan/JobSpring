package com.jobspring.jobservice.repository;

import com.jobspring.jobservice.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // You can add more custom queries if needed later
}
