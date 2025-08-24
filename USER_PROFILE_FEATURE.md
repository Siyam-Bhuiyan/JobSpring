# User Profile Feature Documentation

## Overview

The User Profile feature allows authenticated users to create, manage, and maintain their professional profiles with comprehensive information including education, experience, skills, bio, social links, profile pictures, and CV uploads using Supabase cloud storage.

## Architecture

### Backend Components

#### 1. Entity Layer

- **UserProfile.java** - JPA entity for profile data
  - Fields: phone, location, university, degree, graduationYear, experience, skills, bio, social URLs
  - File URLs: profilePictureUrl, cvUrl
  - Relationships: One-to-one with User entity

#### 2. Repository Layer

- **UserProfileRepository.java** - Data access layer
  - `findByUserId()` - Find profile by user ID
  - `existsByUserId()` - Check if profile exists
  - `deleteByUserId()` - Delete profile by user ID

#### 3. Service Layer

- **UserProfileService.java** - Business logic layer

  - Profile CRUD operations
  - File upload/delete integration with Supabase
  - Profile picture and CV management

- **SupabaseStorageService.java** - Cloud storage integration
  - File upload to three buckets: cv-uploads, profile-image-uploads, post-pictures
  - File validation (PDF for CVs, images for pictures)
  - File deletion capabilities

#### 4. Controller Layer

- **UserProfileController.java** - REST API endpoints
  - `GET /api/profiles/my-profile` - Get current user's profile
  - `GET /api/profiles/user/{userId}` - Get public profile
  - `PUT /api/profiles/my-profile` - Update profile
  - `POST /api/profiles/my-profile/profile-picture` - Upload profile picture
  - `POST /api/profiles/my-profile/cv` - Upload CV
  - `DELETE /api/profiles/my-profile/profile-picture` - Delete profile picture
  - `DELETE /api/profiles/my-profile/cv` - Delete CV
  - `DELETE /api/profiles/my-profile` - Delete entire profile

### Frontend Components

#### 1. Component Layer

- **UserProfile.jsx** - Main profile management component
  - Form for profile information
  - File upload interfaces
  - Skills management with chips
  - Social links configuration

#### 2. State Management

- **profileSlice.js** - Redux slice for profile state
  - Async thunks for all profile operations
  - Loading, error, and success state management
  - File upload progress tracking

#### 3. API Layer

- **profileAPI.js** - API service functions
  - HTTP requests to backend endpoints
  - File upload with FormData
  - JWT authentication integration

## Security Configuration

### Authentication Requirements

```javascript
// Public endpoints
GET /api/profiles/user/** - Public profile viewing

// Protected endpoints (require JWT)
/api/profiles/** - All other profile operations
```

### File Upload Security

- **CV uploads**: Only PDF files accepted
- **Profile pictures**: Only image files accepted
- **File size validation**: Implemented in service layer
- **User isolation**: Users can only manage their own files

## Database Schema

### user_profiles Table

```sql
CREATE TABLE user_profiles (
    user_id BIGINT PRIMARY KEY,
    phone VARCHAR(20),
    location VARCHAR(100),
    university VARCHAR(100),
    degree VARCHAR(100),
    graduation_year VARCHAR(10),
    experience_level VARCHAR(20),
    skills TEXT,
    bio TEXT,
    portfolio_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    twitter_url VARCHAR(255),
    profile_picture_url VARCHAR(500),
    cv_url VARCHAR(500),
    cv_file_name VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Supabase Storage Configuration

### Storage Buckets

1. **cv-uploads** - For PDF resume/CV files
2. **profile-image-uploads** - For profile pictures
3. **post-pictures** - For blog post images

### Environment Variables Required

```properties
# Add to application.properties
supabase.url=your_supabase_url
supabase.key=your_supabase_service_key
```

## Usage Examples

### Creating/Updating Profile

```javascript
// Frontend Redux dispatch
dispatch(
  updateProfile({
    phone: "+1234567890",
    location: "New York, NY",
    university: "MIT",
    degree: "Computer Science",
    graduationYear: 2020,
    experience: "Software Engineer with 3 years...",
    skills: "React, Java, Python",
    bio: "Passionate developer...",
    portfolioUrl: "https://myportfolio.com",
    linkedinUrl: "https://linkedin.com/in/username",
    githubUrl: "https://github.com/username",
  })
);
```

### File Upload

```javascript
// Profile picture upload
const handleProfilePictureUpload = (event) => {
  const file = event.target.files[0];
  dispatch(uploadProfilePicture(file));
};

// CV upload
const handleCVUpload = (event) => {
  const file = event.target.files[0];
  dispatch(uploadCV(file));
};
```

### Backend API Usage

```bash
# Get current user profile
GET /api/profiles/my-profile
Authorization: Bearer <jwt_token>

# Update profile
PUT /api/profiles/my-profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "phone": "+1234567890",
  "location": "New York, NY",
  "university": "MIT",
  "degree": "Computer Science",
  "graduationYear": 2020,
  "experience": "Software Engineer...",
  "skills": "React, Java, Python",
  "bio": "Passionate developer..."
}

# Upload profile picture
POST /api/profiles/my-profile/profile-picture
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <image_file>

# Upload CV
POST /api/profiles/my-profile/cv
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <pdf_file>
```

## UI/UX Features

### Profile Form

- **Contact Information**: Phone, location
- **Education**: University, degree, graduation year
- **Experience**: Work experience description
- **Skills**: Tag-based skill management with add/remove functionality
- **Bio**: Personal description
- **Social Links**: Portfolio, LinkedIn, GitHub, Twitter

### File Management

- **Profile Picture**: Upload, view, delete with avatar preview
- **CV/Resume**: Upload PDF, view current, delete with status indicators
- **Progress Tracking**: Visual feedback during file uploads

### User Experience

- **Form Validation**: Client and server-side validation
- **Loading States**: Progress indicators during operations
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for successful operations
- **Responsive Design**: Mobile-friendly interface

## Navigation Integration

### Navbar Menu

- Profile link added to authenticated user menu
- Quick access from any page
- Clear separation from dashboard

### Routing

```javascript
// App.jsx route configuration
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  }
/>
```

## Error Handling

### Frontend Error States

```javascript
// Redux error handling
{
  error && (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  );
}

// Auto-dismiss errors after 5 seconds
useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      dispatch(clearProfileError());
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [error, dispatch]);
```

### Backend Error Responses

- **400 Bad Request**: Invalid file format or validation errors
- **401 Unauthorized**: Missing or invalid JWT token
- **404 Not Found**: Profile not found
- **500 Internal Server Error**: Server or storage errors

## Testing

### Backend Testing

```bash
# Compile and test
./mvnw clean compile test

# Run application
./mvnw spring-boot:run
```

### Frontend Testing

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### Manual Testing Checklist

- [ ] Profile creation for new users
- [ ] Profile updates for existing users
- [ ] Profile picture upload/delete
- [ ] CV upload/delete
- [ ] Skills management
- [ ] Public profile viewing
- [ ] Authentication protection
- [ ] File validation
- [ ] Error handling
- [ ] Loading states

## Performance Considerations

### File Upload Optimization

- **File size limits**: Enforced in service layer
- **File type validation**: Client and server-side
- **Chunked uploads**: For large files
- **CDN delivery**: Supabase provides global CDN

### Caching Strategy

- **Profile data**: Cached in Redux store
- **File URLs**: Cached with profile data
- **API responses**: Browser caching headers

## Security Best Practices

### Input Validation

- **File type validation**: Strict MIME type checking
- **File size limits**: Prevent large file uploads
- **URL validation**: Social links validation
- **XSS prevention**: Input sanitization

### Access Control

- **User isolation**: Users can only access their own profiles
- **Public profile limits**: Controlled public data exposure
- **JWT validation**: All protected endpoints require valid tokens

## Future Enhancements

### Planned Features

1. **CV Parsing**: AI-powered CV content extraction
2. **Skill Recommendations**: Based on profile data
3. **Profile Completeness**: Progress indicators
4. **Social Verification**: LinkedIn profile verification
5. **Profile Analytics**: View statistics
6. **Profile Templates**: Pre-designed profile layouts
7. **Export Options**: PDF profile generation
8. **Privacy Settings**: Control public profile visibility

### Integration Opportunities

1. **Job Matching**: Use profile data for job recommendations
2. **Company Matching**: Connect with company preferences
3. **Networking**: User-to-user connections
4. **Blog Author Profiles**: Link with blog posts
5. **Application Enhancement**: Auto-fill application forms

## Troubleshooting

### Common Issues

#### File Upload Fails

```
Error: File upload failed
Solution: Check Supabase configuration and file size limits
```

#### Profile Not Loading

```
Error: Profile not found
Solution: Ensure user is authenticated and profile exists
```

#### Compilation Errors

```
Error: Cannot find symbol
Solution: Ensure all dependencies are added to pom.xml
```

### Debug Steps

1. Check server logs for errors
2. Verify JWT token validity
3. Confirm Supabase storage configuration
4. Test API endpoints with Postman
5. Check browser console for frontend errors

## Deployment Notes

### Backend Deployment

- Ensure OkHttp and JSON dependencies are included
- Configure Supabase environment variables
- Set up database migrations for user_profiles table

### Frontend Deployment

- Build React application: `npm run build`
- Ensure Redux store includes profile slice
- Configure API base URL for production

### Storage Configuration

- Set up Supabase storage buckets
- Configure CORS policies for file uploads
- Set appropriate file size limits and retention policies
