# JobSpring Component Development Guide

This guide explains how to add new components to the JobSpring project with proper JWT authentication, security, and best practices.

## Table of Contents

1. [Backend Component Setup](#backend-component-setup)
2. [Frontend Component Setup](#frontend-component-setup)
3. [JWT Authentication Integration](#jwt-authentication-integration)
4. [Database Integration](#database-integration)
5. [Best Practices](#best-practices)
6. [Testing](#testing)

## Backend Component Setup

### 1. Create the Entity (Model)

Create your entity in `server/src/main/java/com/jobspring/model/`

```java
package com.jobspring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "your_entities")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YourEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // For user-owned entities

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### 2. Create the Repository

Create repository in `server/src/main/java/com/jobspring/repository/`

```java
package com.jobspring.repository;

import com.jobspring.model.YourEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface YourEntityRepository extends JpaRepository<YourEntity, Long> {
    List<YourEntity> findByUserId(Long userId);
    List<YourEntity> findByTitleContainingIgnoreCase(String title);
}
```

### 3. Create the Service

Create service in `server/src/main/java/com/jobspring/service/`

```java
package com.jobspring.service;

import com.jobspring.model.YourEntity;
import com.jobspring.repository.YourEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class YourEntityService {

    private final YourEntityRepository repo;

    public List<YourEntity> list() {
        return repo.findAll();
    }

    public YourEntity get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Entity not found"));
    }

    public YourEntity create(YourEntity entity) {
        return repo.save(entity);
    }

    public YourEntity update(Long id, YourEntity patch) {
        YourEntity existing = get(id);
        if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
        if (patch.getDescription() != null) existing.setDescription(patch.getDescription());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }

    public List<YourEntity> listByUser(Long userId) {
        return repo.findByUserId(userId);
    }
}
```

### 4. Create the Controller with JWT Authentication

Create controller in `server/src/main/java/com/jobspring/controller/`

```java
package com.jobspring.controller;

import com.jobspring.model.User;
import com.jobspring.model.YourEntity;
import com.jobspring.service.UserService;
import com.jobspring.service.YourEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/your-entities")
@RequiredArgsConstructor
public class YourEntityController {

    private final YourEntityService service;
    private final UserService userService;

    // PUBLIC - Get all entities
    @GetMapping
    public List<YourEntity> list() {
        return service.list();
    }

    // PUBLIC - Get entity by ID
    @GetMapping("/{id}")
    public YourEntity get(@PathVariable Long id) {
        return service.get(id);
    }

    // REQUIRES AUTHENTICATION - Create new entity
    @PostMapping
    public ResponseEntity<YourEntity> create(@RequestBody YourEntity entity) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email in our JWT implementation

        // Get user details and set as owner
        User user = userService.getByEmail(email);
        entity.setUser(user);

        YourEntity created = service.create(entity);
        return ResponseEntity.created(URI.create("/api/your-entities/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - Update entity (only owner can update)
    @PutMapping("/{id}")
    public YourEntity update(@PathVariable Long id, @RequestBody YourEntity patch) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getByEmail(email);

        // Check if user owns this entity
        YourEntity existing = service.get(id);
        if (!existing.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You can only update your own entities");
        }

        return service.update(id, patch);
    }

    // REQUIRES AUTHENTICATION - Delete entity (only owner can delete)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getByEmail(email);

        // Check if user owns this entity
        YourEntity existing = service.get(id);
        if (!existing.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You can only delete your own entities");
        }

        service.delete(id);
    }

    // REQUIRES AUTHENTICATION - Get current user's entities
    @GetMapping("/my-entities")
    public List<YourEntity> getMyEntities() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        return service.listByUser(user.getId());
    }

    // PUBLIC - Get entities by specific user
    @GetMapping("/user/{userId}")
    public List<YourEntity> listByUser(@PathVariable Long userId) {
        return service.listByUser(userId);
    }
}
```

### 5. Update Security Configuration

Add your endpoints to `server/src/main/java/com/jobspring/config/SecurityConfig.java`:

```java
// In the configure method, add your endpoints:
.requestMatchers(HttpMethod.GET, "/api/your-entities/**").permitAll()
.requestMatchers(HttpMethod.POST, "/api/your-entities").authenticated()
.requestMatchers(HttpMethod.PUT, "/api/your-entities/**").authenticated()
.requestMatchers(HttpMethod.DELETE, "/api/your-entities/**").authenticated()
```

## Frontend Component Setup

### 1. Create API Service

Add to `client/src/api/services.js`:

```javascript
// Add to existing services object
export const yourEntityAPI = {
  getAll: () => api.get("/your-entities"),
  getById: (id) => api.get(`/your-entities/${id}`),
  create: (data) => api.post("/your-entities", data),
  update: (id, data) => api.put(`/your-entities/${id}`, data),
  delete: (id) => api.delete(`/your-entities/${id}`),
  getMyEntities: () => api.get("/your-entities/my-entities"),
  getByUser: (userId) => api.get(`/your-entities/user/${userId}`),
};
```

### 2. Create Redux Slice

Create `client/src/redux/slices/yourEntitySlice.js`:

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { yourEntityAPI } from "../../api/services";

// Async thunks
export const fetchYourEntities = createAsyncThunk(
  "yourEntities/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await yourEntityAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch entities"
      );
    }
  }
);

export const createYourEntity = createAsyncThunk(
  "yourEntities/create",
  async (entityData, { rejectWithValue }) => {
    try {
      const response = await yourEntityAPI.create(entityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create entity"
      );
    }
  }
);

export const updateYourEntity = createAsyncThunk(
  "yourEntities/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await yourEntityAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update entity"
      );
    }
  }
);

export const deleteYourEntity = createAsyncThunk(
  "yourEntities/delete",
  async (id, { rejectWithValue }) => {
    try {
      await yourEntityAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete entity"
      );
    }
  }
);

export const fetchMyYourEntities = createAsyncThunk(
  "yourEntities/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await yourEntityAPI.getMyEntities();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my entities"
      );
    }
  }
);

// Initial state
const initialState = {
  entities: [],
  myEntities: [],
  loading: false,
  error: null,
};

// Slice
const yourEntitySlice = createSlice({
  name: "yourEntities",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all entities
      .addCase(fetchYourEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYourEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchYourEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create entity
      .addCase(createYourEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createYourEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.push(action.payload);
        state.myEntities.push(action.payload);
      })
      .addCase(createYourEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update entity
      .addCase(updateYourEntity.fulfilled, (state, action) => {
        const index = state.entities.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
        const myIndex = state.myEntities.findIndex(
          (e) => e.id === action.payload.id
        );
        if (myIndex !== -1) {
          state.myEntities[myIndex] = action.payload;
        }
      })
      // Delete entity
      .addCase(deleteYourEntity.fulfilled, (state, action) => {
        state.entities = state.entities.filter((e) => e.id !== action.payload);
        state.myEntities = state.myEntities.filter(
          (e) => e.id !== action.payload
        );
      })
      // Fetch my entities
      .addCase(fetchMyYourEntities.fulfilled, (state, action) => {
        state.myEntities = action.payload;
      });
  },
});

export const { clearError } = yourEntitySlice.actions;
export default yourEntitySlice.reducer;
```

### 3. Add to Store

Update `client/src/redux/store.js`:

```javascript
import yourEntityReducer from "./slices/yourEntitySlice";

export const store = configureStore({
  reducer: {
    // ... existing reducers
    yourEntities: yourEntityReducer,
  },
});
```

### 4. Create React Component

Create `client/src/pages/YourEntities.jsx`:

```jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Fab,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  fetchYourEntities,
  createYourEntity,
  updateYourEntity,
  deleteYourEntity,
  fetchMyYourEntities,
} from "../redux/slices/yourEntitySlice";

const YourEntities = () => {
  const dispatch = useDispatch();
  const { entities, loading, error } = useSelector(
    (state) => state.yourEntities
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchYourEntities());
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(
          updateYourEntity({ id: currentEntity.id, data: formData })
        ).unwrap();
      } else {
        await dispatch(createYourEntity(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleEdit = (entity) => {
    setCurrentEntity(entity);
    setFormData({
      title: entity.title,
      description: entity.description,
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        await dispatch(deleteYourEntity(id)).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentEntity(null);
    setFormData({ title: "", description: "" });
  };

  const handleCreate = () => {
    if (!isAuthenticated) {
      alert("Please login to create entities");
      return;
    }
    setEditMode(false);
    setCurrentEntity(null);
    setFormData({ title: "", description: "" });
    setOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Entities
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {entities.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No entities found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first entity to get started
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {entities.map((entity) => (
            <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={entity.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {entity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entity.description}
                  </Typography>
                </CardContent>
                {isAuthenticated && (
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(entity)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Delete />}
                      color="error"
                      onClick={() => handleDelete(entity.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isAuthenticated && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleCreate}
        >
          <Add />
        </Fab>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? "Edit Entity" : "Create New Entity"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default YourEntities;
```

### 5. Add Route

Update `client/src/App.jsx`:

```jsx
import YourEntities from "./pages/YourEntities";

// Add to your routes:
<Route path="/your-entities" element={<YourEntities />} />;
```

### 6. Add Navigation (Optional)

Update navigation components to include your new route.

## JWT Authentication Integration

### Key Points for JWT Integration:

1. **Backend Authentication**: Always use `SecurityContextHolder.getContext().getAuthentication().getName()` to get the authenticated user's email
2. **Use email as username**: The JWT implementation uses email as the username
3. **UserService method**: Use `userService.getByEmail(email)` instead of `findByUsername()`
4. **Frontend API calls**: The JWT token is automatically included in requests via axios interceptors
5. **Protected routes**: Mark endpoints with appropriate HTTP method restrictions in SecurityConfig

### Authentication Patterns:

```java
// Get authenticated user in controller
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
String email = authentication.getName(); // This is the email
User user = userService.getByEmail(email);
```

```javascript
// Frontend - JWT token automatically included
const response = await api.post("/your-entities", data);
```

## Database Integration

### 1. Add Database Migration (if using Flyway)

Create migration file in `server/src/main/resources/db/migration/`:

```sql
-- V3__Create_your_entities_table.sql
CREATE TABLE your_entities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2. Update application.properties (if needed)

Add any new configuration:

```properties
# Add any specific configurations for your component
```

## Best Practices

### 1. Security

- Always validate user ownership for operations
- Use proper HTTP methods (GET for read, POST for create, PUT for update, DELETE for delete)
- Implement proper error handling
- Don't expose sensitive data in API responses

### 2. Code Organization

- Follow the existing package structure
- Use consistent naming conventions
- Add proper Lombok annotations (@Data, @Builder, etc.)
- Use proper JPA relationships

### 3. Frontend

- Use Material-UI Grid v2 syntax: `size={{ xs: 12, md: 6, lg: 4 }}`
- Implement proper loading states
- Handle errors gracefully
- Use Redux for state management
- Follow existing component patterns

### 4. API Design

- Use RESTful endpoints
- Return appropriate HTTP status codes
- Use consistent response formats
- Implement pagination for large datasets

## Testing

### 1. Backend Testing

Create test files in `server/src/test/java/com/jobspring/`:

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(OrderAnnotation.class)
class YourEntityControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @Order(1)
    void testCreateEntity() {
        // Test implementation
    }

    @Test
    @Order(2)
    void testGetEntity() {
        // Test implementation
    }
}
```

### 2. Frontend Testing

- Test component rendering
- Test user interactions
- Test API integration
- Test authentication flows

## Common Gotchas

1. **MUI Grid**: Use `size={{ xs: 12, md: 6 }}` instead of `xs={12} md={6}`
2. **JWT Authentication**: Use `getByEmail()` not `findByUsername()`
3. **CORS**: Ensure proper CORS configuration for new endpoints
4. **Error Handling**: Always wrap API calls in try-catch blocks
5. **State Management**: Update Redux state properly for optimistic updates

## Example Component Files

All the code examples above can be used as templates for creating new components. Remember to:

1. Replace `YourEntity` with your actual entity name
2. Update field names and types according to your requirements
3. Adjust the UI components based on your needs
4. Add proper validation and error handling
5. Test thoroughly with both authenticated and unauthenticated users

This guide ensures your new components will integrate seamlessly with the existing JWT authentication system and follow the established patterns in the JobSpring project.
