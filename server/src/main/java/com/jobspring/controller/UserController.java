package com.jobspring.controller;

import com.jobspring.model.User;
import com.jobspring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }


    @PostMapping("/users")
    public ResponseEntity<User> create(@RequestBody User user) {
        User created = service.create(user);
        return ResponseEntity.created(URI.create("/api/users/" + created.getId())).body(created);
    }

    @GetMapping("/users")
    public List<User> list() {
        return service.list();
    }

    @GetMapping("/users/{id}")
    public User get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/users/{id}")
    public User update(@PathVariable Long id, @RequestBody User patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/auth/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        User u = service.login(email, password);
        return Map.of(
                "message", "login successful",
                "userId", u.getId(),
                "role", u.getRole(),
                "email", u.getEmail(),
                "name", u.getName()
        );
    }

    @PostMapping("/auth/register")
    public Map<String, Object> register(@RequestBody User user) {
        User created = service.create(user);
        return Map.of(
                "message", "registration successful",
                "userId", created.getId(),
                "role", created.getRole(),
                "email", created.getEmail(),
                "name", created.getName()
        );
    }
}
