package com.jobspring.controller;

import com.jobspring.enums.Role;
import com.jobspring.model.User;
import com.jobspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🟡 User Registration (plain password; no hashing)
    @PostMapping("/signup")
    public Object signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already in use";
        }

        // Default role -> USER if absent; validate if provided
        Role role = user.getRole();
        if (role == null) {
            user.setRole(Role.USER);
        } else if (role != Role.USER && role != Role.RECRUITER && role != Role.ADMIN) {
            return "Error: Invalid role";
        }

        // Save as-is (no hashing)
        User saved = userRepository.save(user);

        // hide password in response
        saved.setPassword(null);
        return saved;
    }

    // 🔎 Filter users by role (case-insensitive)
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        Role parsed = Role.fromString(role);
        if (parsed == null) return List.of(); // or return 400 with advice if you prefer

        return userRepository.findAll()
                .stream()
                .filter(u -> parsed.equals(u.getRole()))
                .peek(u -> u.setPassword(null)) // hide password
                .toList();
    }

    // 🔐 User Login (plain password compare)
    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    if (loginRequest.getPassword() != null
                            && loginRequest.getPassword().equals(user.getPassword())) {
                        user.setPassword(null); // don't expose password
                        return user;
                    } else {
                        return "Error: Invalid password";
                    }
                })
                .orElse("Error: User not found");
    }
}
