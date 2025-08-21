# JobSpring

A comprehensive career guidance and job portal platform.

## Tech Stack

- **Backend**: Spring Boot 3.5.5
- **Database**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Java Version**: 17

## Installation

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

## API Endpoints

**Base URL:** `http://localhost:8080/api`

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

12. `POST /api/jobs/company/{companyId}`

```json
{
  "title": "Software Engineer",
  "description": "Develop amazing software",
  "location": "New York",
  "responsibilities": "Code, test, debug applications",
  "qualifications": "Bachelor degree in Computer Science",
  "skills": ["Java", "Spring Boot", "React"]
}
```

13. `POST /api/jobs`

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

14. `GET /api/jobs`
15. `GET /api/jobs/{id}`
16. `GET /api/jobs/company/{companyId}`
17. `PUT /api/jobs/{id}`
18. `DELETE /api/jobs/{id}`

### Application Management

19. `POST /api/applications/user/{userId}/job/{jobId}`

```json
{
  "status": "applied",
  "coverLetter": "I am excited to contribute to your team!"
}
```

20. `POST /api/applications/job/{jobId}`

```json
{
  "user": {
    "id": 1
  },
  "status": "applied",
  "coverLetter": "I am excited to contribute to your team!"
}
```

21. `POST /api/applications`

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

22. `GET /api/applications`
23. `GET /api/applications/{id}`
24. `GET /api/applications/user/{userId}`
25. `GET /api/applications/job/{jobId}`
26. `PUT /api/applications/{id}`
27. `DELETE /api/applications/{id}`

### Blog Management

28. `POST /api/blogs/user/{userId}`

```json
{
  "title": "How I prepped for my first Java interview",
  "content": "Notes, mistakes, what worked...",
  "tags": ["Java", "Interview", "Career"],
  "published": true
}
```

29. `POST /api/blogs`

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

30. `GET /api/blogs`
31. `GET /api/blogs/published`
32. `GET /api/blogs/search?q={keyword}`
33. `GET /api/blogs/{id}`
34. `GET /api/blogs/user/{userId}`
35. `PUT /api/blogs/{id}`
36. `DELETE /api/blogs/{id}`

## Database Configuration

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
