package com.jobspring.service;

import com.jobspring.model.User;

import java.util.List;

public interface UserService {
    // Interface only (no impl as you requested). Mirror controller actions.
    Object signup(User user);
    List<User> getUsersByRole(String role);
    Object login(User loginRequest);
}
