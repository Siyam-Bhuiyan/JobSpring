package com.jobspring.userservice.controller;

import com.jobspring.userservice.model.User;
import com.jobspring.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // 🟡 User Registration
    @PostMapping("/signup")
    public Object signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already in use";
        }

        String role = user.getRole();
        if (role == null || role.isEmpty()) {
            user.setRole("user");
        } else {
            if (!java.util.Arrays.asList("user", "recruiter", "admin").contains(role.toLowerCase())) {
                return "Error: Invalid role";
            }
            user.setRole(role.toLowerCase());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    // 🔐 User Login
    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                        user.setPassword(null);
                        return user;
                    } else {
                        return "Error: Invalid password";
                    }
                })
                .orElse("Error: User not found");
    }

    // 🔍 Get Users By Role
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().equalsIgnoreCase(role))
                .peek(user -> user.setPassword(null))
                .collect(java.util.stream.Collectors.toList());
    }
}
