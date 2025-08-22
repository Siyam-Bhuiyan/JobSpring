package com.jobspring.service;

import com.jobspring.enums.Role;
import com.jobspring.model.User;
import com.jobspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

    // CREATE
    public User create(User u) {
        if (u.getEmail() == null || u.getPassword() == null) {
            throw new IllegalArgumentException("email and password are required");
        }
        if (repo.existsByEmail(u.getEmail())) {
            throw new IllegalArgumentException("email already in use");
        }
        // normalize role (default: user)
        String role = Role.isValid(u.getRole()) ? Role.normalize(u.getRole()) : "user";
        u.setRole(role);
        
        // Encode password
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        
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

    // READ by email
    public User getByEmail(String email) {
        return repo.findByEmail(email)
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
        if (patch.getPassword() != null) {
            // Encode new password
            existing.setPassword(passwordEncoder.encode(patch.getPassword()));
        }
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

    // Authentication method for JWT
    public User authenticate(String email, String password) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("invalid credentials"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("invalid credentials");
        }
        
        return user;
    }

    // Legacy login method - deprecated, use authenticate instead
    @Deprecated
    public User login(String email, String password) {
        return repo.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("invalid credentials"));
    }
}
