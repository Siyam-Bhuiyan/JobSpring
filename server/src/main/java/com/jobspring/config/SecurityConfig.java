package com.jobspring.config;

import com.jobspring.filter.JwtAuthenticationFilter;
import com.jobspring.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, userDetailsService);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                // Public authentication endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/users/register").permitAll()
                
                // Public read-only endpoints
                .requestMatchers("GET", "/api/companies", "/api/companies/**").permitAll()
                .requestMatchers("GET", "/api/jobs", "/api/jobs/**").permitAll()
                .requestMatchers("GET", "/api/blogs/published", "/api/blogs/search", "/api/blogs/{id}", "/api/blogs/user/**").permitAll()
                
                // Protected company endpoints (create, update, delete require authentication)
                .requestMatchers("POST", "/api/companies").authenticated()
                .requestMatchers("PUT", "/api/companies/**").authenticated()
                .requestMatchers("DELETE", "/api/companies/**").authenticated()
                
                // Protected job endpoints (create, update, delete require authentication)
                .requestMatchers("POST", "/api/jobs", "/api/jobs/**").authenticated()
                .requestMatchers("PUT", "/api/jobs/**").authenticated()
                .requestMatchers("DELETE", "/api/jobs/**").authenticated()
                
                // Protected blog endpoints (create, update, delete require authentication)
                .requestMatchers("POST", "/api/blogs", "/api/blogs/**").authenticated()
                .requestMatchers("PUT", "/api/blogs/**").authenticated()
                .requestMatchers("DELETE", "/api/blogs/**").authenticated()
                .requestMatchers("GET", "/api/blogs", "/api/blogs/my-blogs").authenticated()
                
                // Protected application endpoints (all require authentication)
                .requestMatchers("/api/applications/**").authenticated()
                
                // User management endpoints
                .requestMatchers("/api/users/**").authenticated()
                .requestMatchers("/api/applications/**").authenticated()
                
                // Admin only endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // React app URL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
