package com.jobspring.repository;

import com.jobspring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    // Legacy method - kept for backward compatibility
    Optional<User> findByEmailAndPassword(String email, String password);
}
