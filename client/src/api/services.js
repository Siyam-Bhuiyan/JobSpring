import api from "./index.js";

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  refresh: (refreshData) => api.post("/auth/refresh", refreshData),
  logout: () => {
    // For JWT, we just clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return api.post("/auth/logout");
  },
};

// User API calls
export const userAPI = {
  create: (userData) => api.post("/users", userData),
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

// Enhanced Company API calls with JWT awareness
export const companyAPI = {
  // REQUIRES AUTHENTICATION - Create company
  create: (companyData) => api.post("/companies", companyData),

  // PUBLIC - Get all companies
  getAll: () => api.get("/companies"),

  // PUBLIC - Get company by ID
  getById: (id) => api.get(`/companies/${id}`),

  // REQUIRES AUTHENTICATION - Update company
  update: (id, companyData) => api.put(`/companies/${id}`, companyData),

  // REQUIRES AUTHENTICATION - Delete company
  delete: (id) => api.delete(`/companies/${id}`),
};

// Enhanced Job API calls with JWT awareness
export const jobAPI = {
  // REQUIRES AUTHENTICATION - Create job
  create: (jobData) => api.post("/jobs", jobData),

  // REQUIRES AUTHENTICATION - Create job by company
  createByCompany: (companyId, jobData) =>
    api.post(`/jobs/company/${companyId}`, jobData),

  // PUBLIC - Get all jobs
  getAll: () => api.get("/jobs"),

  // PUBLIC - Get job by ID
  getById: (id) => api.get(`/jobs/${id}`),

  // PUBLIC - Get jobs by company
  getByCompany: (companyId) => api.get(`/jobs/company/${companyId}`),

  // REQUIRES AUTHENTICATION - Update job
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),

  // REQUIRES AUTHENTICATION - Delete job
  delete: (id) => api.delete(`/jobs/${id}`),
};

// Enhanced Application API calls with JWT awareness
export const applicationAPI = {
  // REQUIRES AUTHENTICATION - Create application for current user and specific job
  createForJob: (jobId, applicationData) =>
    api.post(`/applications/job/${jobId}`, applicationData),

  // REQUIRES AUTHENTICATION - Admin: Create application for specific user and job
  createByUserAndJob: (userId, jobId, applicationData) =>
    api.post(`/applications/user/${userId}/job/${jobId}`, applicationData),

  // REQUIRES AUTHENTICATION - General create
  create: (applicationData) => api.post("/applications", applicationData),

  // REQUIRES AUTHENTICATION - Get all applications
  getAll: () => api.get("/applications"),

  // REQUIRES AUTHENTICATION - Get current user's applications
  getMyApplications: () => api.get("/applications/my-applications"),

  // REQUIRES AUTHENTICATION - Get application by ID
  getById: (id) => api.get(`/applications/${id}`),

  // REQUIRES AUTHENTICATION - Get applications by user (admin)
  getByUser: (userId) => api.get(`/applications/user/${userId}`),

  // PUBLIC - Get applications by job (employers can see applicants)
  getByJob: (jobId) => api.get(`/applications/job/${jobId}`),

  // REQUIRES AUTHENTICATION - Update application
  update: (id, applicationData) =>
    api.put(`/applications/${id}`, applicationData),

  // REQUIRES AUTHENTICATION - Delete application
  delete: (id) => api.delete(`/applications/${id}`),
};

// Enhanced Blog API calls with JWT awareness
export const blogAPI = {
  // REQUIRES AUTHENTICATION - Create blog as authenticated user
  create: (blogData) => api.post("/blogs", blogData),

  // REQUIRES AUTHENTICATION - Create blog for specific user (admin)
  createByUser: (userId, blogData) =>
    api.post(`/blogs/user/${userId}`, blogData),

  // REQUIRES AUTHENTICATION - Get all blogs (authenticated users only)
  getAll: () => api.get("/blogs"),

  // REQUIRES AUTHENTICATION - Get current user's blogs
  getMyBlogs: () => api.get("/blogs/my-blogs"),

  // PUBLIC - Get published blogs
  getPublished: () => api.get("/blogs/published"),

  // PUBLIC - Search blogs
  search: (query) => api.get(`/blogs/search?q=${encodeURIComponent(query)}`),

  // PUBLIC - Get specific blog by ID
  getById: (id) => api.get(`/blogs/${id}`),

  // PUBLIC - Get blogs by specific user
  getByUser: (userId) => api.get(`/blogs/user/${userId}`),

  // REQUIRES AUTHENTICATION - Update blog
  update: (id, blogData) => api.put(`/blogs/${id}`, blogData),

  // REQUIRES AUTHENTICATION - Delete blog
  delete: (id) => api.delete(`/blogs/${id}`),
};

// Enhanced Profile API calls with JWT awareness
export const profileAPI = {
  // REQUIRES AUTHENTICATION - Get current user's profile
  getMyProfile: () => api.get("/profiles/my-profile"),

  // PUBLIC - Get public profile by user ID
  getPublicProfile: (userId) => api.get(`/profiles/user/${userId}`),

  // REQUIRES AUTHENTICATION - Update current user's profile
  updateProfile: (profileData) => api.put("/profiles/my-profile", profileData),

  // REQUIRES AUTHENTICATION - Upload profile picture
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/profiles/my-profile/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // REQUIRES AUTHENTICATION - Upload CV/Resume
  uploadCV: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/profiles/my-profile/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // REQUIRES AUTHENTICATION - Delete profile picture
  deleteProfilePicture: () => api.delete("/profiles/my-profile/profile-picture"),

  // REQUIRES AUTHENTICATION - Delete CV
  deleteCV: () => api.delete("/profiles/my-profile/cv"),

  // REQUIRES AUTHENTICATION - Delete entire profile
  deleteProfile: () => api.delete("/profiles/my-profile"),
};
