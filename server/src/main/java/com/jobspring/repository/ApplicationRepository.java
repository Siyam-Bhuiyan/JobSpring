package com.jobspring.repository;

import com.jobspring.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser_Id(Long userId);
    List<Application> findByJob_Id(Long jobId);
    boolean existsByUser_IdAndJob_Id(Long userId, Long jobId);
}
