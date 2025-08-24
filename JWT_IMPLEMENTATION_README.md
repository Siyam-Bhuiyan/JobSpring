# JWT Authentication Implementation in JobSpring

## Overview

This document explains the complete implementation of JWT (JSON Web Token) authentication in the JobSpring application, including both backend (Spring Boot) and frontend (React) components.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Integration](#frontend-integration)
4. [Security Flow](#security-flow)
5. [Testing Guide](#testing-guide)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## Project Setup

### Dependencies Added

#### Backend (Maven - pom.xml)

```xml
<!-- Spring Boot Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT Library -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

#### Frontend (package.json)

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "@reduxjs/toolkit": "^1.9.0"
  }
}
```

---

## Backend Implementation

### Step 1: JWT Utility Class

**File:** `server/src/main/java/com/jobspring/util/JwtUtil.java`

**Purpose:** Handles JWT token generation, validation, and parsing operations.

**Key Functions:**

- `generateToken(UserDetails userDetails)` - Creates JWT tokens with user information
- `validateToken(String token, UserDetails userDetails)` - Verifies token validity
- `extractUsername(String token)` - Extracts username from token
- `extractExpiration(String token)` - Gets token expiration date

**What it does:**

```java
@Component
public class JwtUtil {
    private String SECRET_KEY;
    private int JWT_EXPIRATION;

    // Generates JWT token with username and expiration
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    // Validates if token is authentic and not expired
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
```

### Step 2: JWT Authentication Filter

**File:** `server/src/main/java/com/jobspring/filter/JwtAuthenticationFilter.java`

**Purpose:** Intercepts HTTP requests to check for JWT tokens and authenticate users.

**What it does:**

- Checks every incoming HTTP request for JWT token in Authorization header
- Validates the token using JwtUtil
- Sets authentication context for valid tokens
- Allows request to proceed if token is valid

**Key Process:**

```java
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain chain) {
        // 1. Extract JWT token from Authorization header
        String authorizationHeader = request.getHeader("Authorization");

        // 2. Validate token format (Bearer token)
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            String username = jwtUtil.extractUsername(jwt);

            // 3. Set authentication if valid
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    // Set authentication in security context
                }
            }
        }

        // 4. Continue filter chain
        chain.doFilter(request, response);
    }
}
```

### Step 3: Security Configuration

**File:** `server/src/main/java/com/jobspring/config/SecurityConfig.java`

**Purpose:** Configures Spring Security with JWT authentication and authorization rules.

**What it does:**

- Disables CSRF (not needed for stateless JWT)
- Configures CORS for React frontend communication
- Sets up authentication provider with password encoding
- Adds JWT filter to filter chain
- Defines which endpoints are public vs protected

**Key Configuration:**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for stateless JWT
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                // Public endpoints (no authentication required)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/users/register").permitAll()

                // Protected endpoints (authentication required)
                .requestMatchers("/api/users/**").authenticated()
                .requestMatchers("/api/applications/**").authenticated()

                // Admin only endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

### Step 4: Password Configuration

**File:** `server/src/main/java/com/jobspring/config/PasswordConfig.java`

**Purpose:** Provides BCrypt password encoder bean to avoid circular dependencies.

**What it does:**

```java
@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Secure password hashing
    }
}
```

### Step 5: Authentication Controller

**File:** `server/src/main/java/com/jobspring/controller/AuthController.java`

**Purpose:** Provides REST endpoints for authentication operations.

**Endpoints:**

- `POST /api/auth/login` - User login with username/password
- `POST /api/auth/register` - New user registration
- `POST /api/auth/refresh` - Refresh expired JWT tokens

**What it does:**

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        // 1. Authenticate user credentials
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        // 2. Generate JWT token
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // 3. Return tokens and user info
        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken, userDetails.getUsername()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        // Generate new access token from valid refresh token
    }
}
```

### Step 6: DTOs (Data Transfer Objects)

**Files:**

- `server/src/main/java/com/jobspring/dto/LoginRequest.java`
- `server/src/main/java/com/jobspring/dto/JwtResponse.java`
- `server/src/main/java/com/jobspring/dto/RefreshTokenRequest.java`

**Purpose:** Define the structure of requests and responses for authentication endpoints.

**LoginRequest.java:**

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
```

**JwtResponse.java:**

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String refreshToken;
    private String username;
    private String type = "Bearer";  // Token type
}
```

### Step 7: Enhanced User Entity

**File:** `server/src/main/java/com/jobspring/model/User.java`

**Purpose:** Make User entity implement UserDetails interface for Spring Security integration.

**What was added:**

```java
@Entity
public class User implements UserDetails {
    // Existing fields...

    // Spring Security required methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
```

### Step 8: Application Properties

**File:** `server/src/main/resources/application.properties`

**Purpose:** Configure JWT settings and database connection.

**JWT Configuration:**

```properties
# JWT Configuration
jwt.secret=jobspringSecretKeyForJWTTokenGenerationAndValidation123456789
jwt.expiration=86400000       # 24 hours in milliseconds
jwt.refresh-expiration=604800000  # 7 days in milliseconds

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/jobspring
spring.datasource.username=postgres
spring.datasource.password=postgres

# Server Configuration
server.port=8080  # Changed from 8080 to avoid conflicts
```

---

## Frontend Integration

### Step 9: Enhanced API Configuration

**File:** `client/src/api/index.js`

**Purpose:** Configure Axios to automatically handle JWT tokens and token refresh.

**What it does:**

```javascript
// Request interceptor - adds JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add Bearer token
  }
  return config;
});

// Response interceptor - handles token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Try to refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken: refreshToken,
      });

      // Update stored token and retry original request
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    }
  }
);
```

### Step 10: Enhanced Redux Auth Slice

**File:** `client/src/redux/slices/authSlice.js`

**Purpose:** Manage authentication state and JWT tokens in Redux store.

**Key Features:**

- Login/Register actions that store JWT tokens
- Automatic token refresh
- Logout functionality that clears tokens
- Persistent authentication state

**Key Actions:**

```javascript
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      // Store tokens in localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await api.post("/auth/refresh", { refreshToken });

      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

---

## Security Flow

### Authentication Flow:

1. **User Login:** Frontend sends username/password to `/api/auth/login`
2. **Server Validation:** Spring Security validates credentials
3. **Token Generation:** Server generates JWT access token (24h) and refresh token (7 days)
4. **Token Storage:** Frontend stores tokens in localStorage
5. **Authenticated Requests:** All subsequent API calls include `Authorization: Bearer <token>` header

### Request Flow:

```
1. Frontend Request → 2. JWT Filter → 3. Token Validation → 4. Set Authentication → 5. Controller
```

### Token Refresh Flow:

1. **Token Expiry:** Server returns 401 Unauthorized
2. **Auto Refresh:** Frontend automatically calls `/api/auth/refresh` with refresh token
3. **New Token:** Server validates refresh token and issues new access token
4. **Retry Request:** Frontend retries original request with new token

---

## Testing Guide

### 1. Test Registration

```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Test Login

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Expected Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser",
  "type": "Bearer"
}
```

### 3. Test Protected Endpoints

#### Jobs API Testing:

```bash
# PUBLIC - Get all jobs (no authentication required)
GET http://localhost:8080/api/jobs

# PROTECTED - Create a job (requires JWT token)
POST http://localhost:8080/api/jobs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Software Developer",
  "description": "Join our development team",
  "requirements": "Java, Spring Boot experience",
  "company": {"id": 1}
}

# PROTECTED - Update a job (requires JWT token)
PUT http://localhost:8080/api/jobs/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Senior Software Developer"
}

# PROTECTED - Delete a job (requires JWT token)
DELETE http://localhost:8080/api/jobs/1
Authorization: Bearer <your-jwt-token>
```

#### Companies API Testing:

```bash
# PUBLIC - Get all companies (no authentication required)
GET http://localhost:8080/api/companies

# PROTECTED - Create a company (requires JWT token)
POST http://localhost:8080/api/companies
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Tech Solutions Inc",
  "description": "Leading technology company",
  "website": "https://techsolutions.com"
}

# PROTECTED - Update a company (requires JWT token)
PUT http://localhost:8080/api/companies/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "description": "Updated company description"
}
```

#### Blogs API Testing:

```bash
# PUBLIC - Get published blogs (no authentication required)
GET http://localhost:8080/api/blogs/published

# PROTECTED - Create a blog (requires JWT token, user auto-set as author)
POST http://localhost:8080/api/blogs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Getting Started with Spring Boot",
  "content": "Spring Boot makes it easy to create applications...",
  "published": true
}

# PROTECTED - Get my blogs (requires JWT token)
GET http://localhost:8080/api/blogs/my-blogs
Authorization: Bearer <your-jwt-token>

# PROTECTED - Update a blog (requires JWT token)
PUT http://localhost:8080/api/blogs/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated Blog Title"
}
```

### 4. Test Token Refresh

```bash
POST http://localhost:8080/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<your-refresh-token>"
}
```

### 5. Test Unauthorized Access

Try accessing protected endpoints without a token:

```bash
# Should return 401 Unauthorized
POST http://localhost:8080/api/jobs
Content-Type: application/json

{
  "title": "Test Job"
}
```

### 3. Test Protected Endpoint

```bash
GET http://localhost:8080/api/users/profile
Authorization: Bearer <your-jwt-token>
```

### 4. Test Token Refresh

```bash
POST http://localhost:8080/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<your-refresh-token>"
}
```

---

## Common Issues & Solutions

### Issue 1: Circular Dependency Error

**Problem:** Spring beans creating circular references
**Solution:** Created separate `PasswordConfig.java` and created `JwtAuthenticationFilter` as `@Bean` in `SecurityConfig`

### Issue 2: Port 8080 Already in Use

**Problem:** React dev server using same port
**Solution:** Changed Spring Boot server to port 8080 in `application.properties`

### Issue 3: CORS Issues

**Problem:** Frontend can't communicate with backend
**Solution:** Added CORS configuration in `SecurityConfig.java` allowing React app origin

### Issue 4: Token Not Included in Requests

**Problem:** Axios not sending JWT tokens
**Solution:** Added request interceptor in `api/index.js` to automatically include Bearer token

---

## Summary

This JWT implementation provides:

1. **Secure Authentication** - BCrypt password hashing and JWT tokens
2. **Stateless Design** - No server-side sessions, scalable architecture
3. **Automatic Token Refresh** - Seamless user experience with token renewal
4. **Role-Based Access** - Different permissions for users and admins
5. **CORS Support** - Frontend-backend communication
6. **Error Handling** - Graceful handling of authentication errors
7. **Feature Integration** - JWT protection for Jobs, Companies, and Blogs

### 🔐 **JWT Protection Implementation Summary:**

#### **Jobs Feature:**

- **Public Access**: View all jobs, view specific job, view jobs by company
- **Requires Authentication**: Create job, update job, delete job
- **User Context**: Authenticated user information available in create/update/delete operations

#### **Companies Feature:**

- **Public Access**: View all companies, view specific company
- **Requires Authentication**: Create company, update company, delete company
- **User Context**: Authenticated user information available in create/update/delete operations

#### **Blogs Feature:**

- **Public Access**: View published blogs, search blogs, view specific blog, view blogs by user
- **Requires Authentication**: Create blog, view all blogs, view user's own blogs, update blog, delete blog
- **User Context**: Authenticated user automatically set as blog author, user can manage their own blogs

#### **Security Configuration:**

- **Public Endpoints**: Authentication, registration, and read-only content access
- **Protected Endpoints**: All create, update, delete operations require valid JWT token
- **Admin Endpoints**: Special admin-only endpoints for administrative functions
- **Method-Level Security**: Different permissions for GET (read) vs POST/PUT/DELETE (write) operations

### 🚀 **Enhanced Frontend API Integration:**

All frontend API services now include:

- Automatic JWT token attachment to authenticated requests
- Clear documentation of which endpoints require authentication
- Proper error handling for authentication failures
- Token refresh functionality for expired tokens

The implementation follows Spring Security best practices and provides a production-ready authentication system for the complete JobSpring application with comprehensive feature protection.
