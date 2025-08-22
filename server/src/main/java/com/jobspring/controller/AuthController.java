package com.jobspring.controller;

import com.jobspring.dto.JwtResponse;
import com.jobspring.dto.LoginRequest;
import com.jobspring.dto.RefreshTokenRequest;
import com.jobspring.model.User;
import com.jobspring.service.UserService;
import com.jobspring.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            // Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.getByEmail(userDetails.getUsername());

            // Generate tokens
            String token = jwtUtil.generateToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);

            // Build response
            JwtResponse response = JwtResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            
            // Validate refresh token
            if (!jwtUtil.isRefreshToken(refreshToken) || jwtUtil.isTokenExpired(refreshToken)) {
                return ResponseEntity.badRequest().build();
            }

            // Extract user from refresh token
            String email = jwtUtil.extractUsername(refreshToken);
            UserDetails userDetails = userService.loadUserByUsername(email);
            User user = userService.getByEmail(email);

            // Generate new access token
            String newToken = jwtUtil.generateToken(userDetails);

            // Build response
            JwtResponse response = JwtResponse.builder()
                .token(newToken)
                .refreshToken(refreshToken) // Keep the same refresh token
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody User user) {
        try {
            // Create new user
            User createdUser = userService.create(user);

            // Load user details for JWT
            UserDetails userDetails = userService.loadUserByUsername(createdUser.getEmail());

            // Generate tokens
            String token = jwtUtil.generateToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);

            // Build response
            JwtResponse response = JwtResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .id(createdUser.getId())
                .email(createdUser.getEmail())
                .name(createdUser.getName())
                .role(createdUser.getRole())
                .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // In a real application, you might want to blacklist the token
        // For now, we'll just return success since JWT is stateless
        return ResponseEntity.ok("Logged out successfully");
    }
}
