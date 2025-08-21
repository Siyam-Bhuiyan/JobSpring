package com.jobspring.service;

import com.jobspring.enums.Role;
import com.jobspring.model.User;
import com.jobspring.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public User create(User u) {
        if (u.getEmail() == null || u.getPassword() == null) {
            throw new IllegalArgumentException("email and password are required");
        }
        if (repo.existsByEmail(u.getEmail())) {
            throw new IllegalArgumentException("email already in use");
        }
        // normalize role (default: registered)
        String role = Role.isValid(u.getRole()) ? Role.normalize(u.getRole()) : "user";
        u.setRole(role);
        return repo.save(u);
    }

    public List<User> list() {
        return repo.findAll();
    }

    // READ by id
    public User get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("user not found"));
    }

    // UPDATE
    public User update(Long id, User patch) {
        User existing = get(id);
        if (patch.getName() != null) existing.setName(patch.getName());
        if (patch.getEmail() != null) {
            if (!patch.getEmail().equals(existing.getEmail()) && repo.existsByEmail(patch.getEmail())) {
                throw new IllegalArgumentException("email already in use");
            }
            existing.setEmail(patch.getEmail());
        }
        if (patch.getPassword() != null) existing.setPassword(patch.getPassword()); // plain text
        if (patch.getRole() != null && Role.isValid(patch.getRole())) {
            existing.setRole(Role.normalize(patch.getRole()));
        }
        if (patch.getResumePath() != null) existing.setResumePath(patch.getResumePath());
        return repo.save(existing);
    }

    // DELETE
    public void delete(Long id) {
        repo.delete(get(id));
    }

    public User login(String email, String password) {
        return repo.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("invalid credentials"));
    }
}
