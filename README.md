# JobSpring

A comprehensive career guidance and job portal platform that bridges the gap between career-seeking individuals across all sectors - pre-university, university, and post-graduation students.

## Introduction

JobSpring helps individuals make informed career decisions by providing:

- **Pre-university students**: Personalized career path recommendations, subject selection advice based on skills and interests
- **University/Graduate students**: Specialized career domains exploration, job portal experience, interview preparation with question banks
- **Professionals & Recruiters**: AI-based CV scanning, job posting capabilities, and candidate matching

## Features

- ✅ User Management (Registration, Authentication, Profiles)
- ✅ Company Management
- ✅ Job Posting and Management
- ✅ Job Application System
- ✅ Blog System (Content Management)
- 🚧 Interview System (Planned)
- 🚧 AI-based CV Scanning (Planned)
- 🚧 Event Management (Planned)
- 🚧 Career Path Recommendations (Planned)

## Tech Stack

- **Backend**: Spring Boot 3.5.5
- **Database**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Java Version**: 17

=

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Siyam-Bhuiyan/JobSpring.git
cd JobSpring/server
```

2. Configure PostgreSQL database:

   - Create a database named `jobspring`
   - Update `src/main/resources/application.properties` with your database credentials

3. Run the application:

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

### Base URL

```
http://localhost:8080/api
```

### Authentication Endpoints

#### User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "login successful",
  "userId": 1,
  "role": "user",
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

### User Management

#### Create User

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Get All Users

```http
GET /api/users
```

#### Get User by ID

```http
GET /api/users/{id}
```

#### Update User

```http
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

#### Delete User

```http
DELETE /api/users/{id}
```

---

### Company Management

#### Create Company

```http
POST /api/companies
Content-Type: application/json

{
  "name": "TechCorp",
  "description": "A technology company",
  "location": "New York",
  "website": "https://techcorp.com"
}
```

#### Get All Companies

```http
GET /api/companies
```

#### Get Company by ID

```http
GET /api/companies/{id}
```

#### Update Company

```http
PUT /api/companies/{id}
Content-Type: application/json

{
  "name": "TechCorp Updated",
  "description": "An innovative technology company"
}
```

#### Delete Company

```http
DELETE /api/companies/{id}
```

---

### Job Management

#### Create Job

```http
POST /api/jobs
Content-Type: application/json

{
  "title": "Software Engineer",
  "description": "Develop amazing software",
  "location": "New York",
  "responsibilities": "Code, test, debug applications",
  "qualifications": "Bachelor degree in Computer Science",
  "skills": ["Java", "Spring Boot", "React"],
  "company": {
    "id": 1
  }
}
```

#### Get All Jobs

```http
GET /api/jobs
```

#### Get Job by ID

```http
GET /api/jobs/{id}
```

#### Get Jobs by Company

```http
GET /api/jobs/company/{companyId}
```

#### Update Job

```http
PUT /api/jobs/{id}
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "description": "Lead software development projects"
}
```

#### Delete Job

```http
DELETE /api/jobs/{id}
```

---

### Application Management

#### Create Application

```http
POST /api/applications
Content-Type: application/json

{
  "user": {
    "id": 1
  },
  "job": {
    "id": 2
  },
  "status": "applied",
  "coverLetter": "I am excited to contribute to your team!"
}
```

#### Get All Applications

```http
GET /api/applications
```

#### Get Application by ID

```http
GET /api/applications/{id}
```

#### Get Applications by User

```http
GET /api/applications/user/{userId}
```

#### Get Applications by Job

```http
GET /api/applications/job/{jobId}
```

#### Update Application

```http
PUT /api/applications/{id}
Content-Type: application/json

{
  "status": "accepted",
  "coverLetter": "Updated cover letter"
}
```

#### Delete Application

```http
DELETE /api/applications/{id}
```

---

### Blog Management

#### Create Blog (URL-based author binding)

```http
POST /api/blogs/user/{userId}
Content-Type: application/json

{
  "title": "How I prepped for my first Java interview",
  "content": "Notes, mistakes, what worked...",
  "tags": ["Java", "Interview", "Career"],
  "published": true
}
```

#### Create Blog (flexible - author in body)

```http
POST /api/blogs
Content-Type: application/json

{
  "title": "Career guidance for CS students",
  "content": "Complete guide for computer science students...",
  "author": {
    "id": 1
  },
  "tags": ["Career", "Computer Science"],
  "published": true
}
```

#### Get All Blogs

```http
GET /api/blogs
```

#### Get Published Blogs Only

```http
GET /api/blogs/published
```

#### Search Blogs

```http
GET /api/blogs/search?q=java
```

#### Get Blog by ID

```http
GET /api/blogs/{id}
```

#### Get Blogs by User

```http
GET /api/blogs/user/{userId}
```

#### Update Blog

```http
PUT /api/blogs/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content",
  "published": false
}
```

#### Delete Blog

```http
DELETE /api/blogs/{id}
```

---

## Data Models

### User

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "user",
  "resumePath": "/path/to/resume.pdf"
}
```

### Company

```json
{
  "id": 1,
  "name": "TechCorp",
  "website": "https://techcorp.com",
  "description": "A technology company",
  "location": "New York"
}
```

### Job

```json
{
  "id": 1,
  "title": "Software Engineer",
  "description": "Develop amazing software",
  "company": {
    "id": 1,
    "name": "TechCorp",
    "website": "https://techcorp.com",
    "description": "A technology company",
    "location": "New York"
  },
  "location": "New York",
  "responsibilities": "Code, test, debug",
  "skills": ["Java", "Spring Boot", "React"],
  "qualifications": "Bachelor degree in CS"
}
```

### Application

```json
{
  "id": 1,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "job": {
    "id": 2,
    "title": "Software Engineer",
    "company": { ... }
  },
  "status": "applied",
  "coverLetter": "I am excited to contribute!",
  "createdAt": "2025-08-22T01:30:00Z",
  "updatedAt": "2025-08-22T01:30:00Z"
}
```

### Blog

```json
{
  "id": 1,
  "title": "How I prepped for my first Java interview",
  "content": "Notes, mistakes, what worked...",
  "author": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "tags": ["Java", "Interview", "Career"],
  "published": true,
  "createdAt": "2025-08-22T01:30:00Z",
  "updatedAt": "2025-08-22T01:30:00Z"
}
```

## User Roles

### 1. Anonymous User

- Browse general career resources
- View public content
- **Cannot**: Apply for jobs, access personalized features

### 2. Registered User

- Apply for jobs and internships
- Access career guidance and recommendations
- Use CV scanning features
- Participate in events and interviews
- **Cannot**: Post jobs

### 3. Recruiters

- Post job openings and internships
- Use AI-based CV scanning for candidate matching
- Review applicant profiles
- Participate in mentorship programs

### 4. Admin

- Manage user accounts and roles
- Content moderation
- Approve job postings and events
- Send platform announcements

## Application Status Values

- `applied` - Initial application status
- `accepted` - Application has been accepted
- `rejected` - Application has been rejected

## All API Endpoints

### Authentication

1. `POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Management

2. `POST /api/users`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

3. `GET /api/users`
4. `GET /api/users/{id}`
5. `PUT /api/users/{id}`
6. `DELETE /api/users/{id}`

### Company Management

7. `POST /api/companies`

```json
{
  "name": "TechCorp",
  "description": "A technology company",
  "location": "New York",
  "website": "https://techcorp.com"
}
```

8. `GET /api/companies`
9. `GET /api/companies/{id}`
10. `PUT /api/companies/{id}`
11. `DELETE /api/companies/{id}`

### Job Management

12. `POST /api/jobs`

```json
{
  "title": "Software Engineer",
  "description": "Develop amazing software",
  "location": "New York",
  "responsibilities": "Code, test, debug applications",
  "qualifications": "Bachelor degree in Computer Science",
  "skills": ["Java", "Spring Boot", "React"],
  "company": {
    "id": 1
  }
}
```

13. `GET /api/jobs`
14. `GET /api/jobs/{id}`
15. `GET /api/jobs/company/{companyId}`
16. `PUT /api/jobs/{id}`
17. `DELETE /api/jobs/{id}`

### Application Management

18. `POST /api/applications`

```json
{
  "user": {
    "id": 1
  },
  "job": {
    "id": 2
  },
  "status": "applied",
  "coverLetter": "I am excited to contribute to your team!"
}
```

19. `GET /api/applications`
20. `GET /api/applications/{id}`
21. `GET /api/applications/user/{userId}`
22. `GET /api/applications/job/{jobId}`
23. `PUT /api/applications/{id}`
24. `DELETE /api/applications/{id}`

### Blog Management

25. `POST /api/blogs/user/{userId}`

```json
{
  "title": "How I prepped for my first Java interview",
  "content": "Notes, mistakes, what worked...",
  "tags": ["Java", "Interview", "Career"],
  "published": true
}
```

26. `POST /api/blogs`

```json
{
  "title": "Career guidance for CS students",
  "content": "Complete guide for computer science students...",
  "author": {
    "id": 1
  },
  "tags": ["Career", "Computer Science"],
  "published": true
}
```

27. `GET /api/blogs`
28. `GET /api/blogs/published`
29. `GET /api/blogs/search?q={keyword}`
30. `GET /api/blogs/{id}`
31. `GET /api/blogs/user/{userId}`
32. `PUT /api/blogs/{id}`
33. `DELETE /api/blogs/{id}`

## Development Setup

### Database Configuration

Update `src/main/resources/application.properties`:

```properties
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/jobspring
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## Future Enhancements

- 🔜 Interview Scheduling System
- 🔜 AI-powered Career Path Recommendations
- 🔜 CV Scanning and Optimization
- 🔜 Event Management System
- 🔜 Blog and Content Management
- 🔜 Real-time Notifications
- 🔜 Advanced Search and Filtering
- 🔜 Chatbot Integration
- 🔜 Video Interview System
- 🔜 Question Bank Management
