import api from './index.js';

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
};

// User API calls
export const userAPI = {
  create: (userData) => api.post('/users', userData),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

// Company API calls
export const companyAPI = {
  create: (companyData) => api.post('/companies', companyData),
  getAll: () => api.get('/companies'),
  getById: (id) => api.get(`/companies/${id}`),
  update: (id, companyData) => api.put(`/companies/${id}`, companyData),
  delete: (id) => api.delete(`/companies/${id}`),
};

// Job API calls
export const jobAPI = {
  create: (jobData) => api.post('/jobs', jobData),
  createByCompany: (companyId, jobData) => api.post(`/jobs/company/${companyId}`, jobData),
  getAll: () => api.get('/jobs'),
  getById: (id) => api.get(`/jobs/${id}`),
  getByCompany: (companyId) => api.get(`/jobs/company/${companyId}`),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
};

// Application API calls
export const applicationAPI = {
  create: (applicationData) => api.post('/applications', applicationData),
  createByUserAndJob: (userId, jobId, applicationData) => 
    api.post(`/applications/user/${userId}/job/${jobId}`, applicationData),
  createByJob: (jobId, applicationData) => 
    api.post(`/applications/job/${jobId}`, applicationData),
  getAll: () => api.get('/applications'),
  getById: (id) => api.get(`/applications/${id}`),
  getByUser: (userId) => api.get(`/applications/user/${userId}`),
  getByJob: (jobId) => api.get(`/applications/job/${jobId}`),
  update: (id, applicationData) => api.put(`/applications/${id}`, applicationData),
  delete: (id) => api.delete(`/applications/${id}`),
};

// Blog API calls
export const blogAPI = {
  create: (blogData) => api.post('/blogs', blogData),
  createByUser: (userId, blogData) => api.post(`/blogs/user/${userId}`, blogData),
  getAll: () => api.get('/blogs'),
  getPublished: () => api.get('/blogs/published'),
  search: (query) => api.get(`/blogs/search?q=${encodeURIComponent(query)}`),
  getById: (id) => api.get(`/blogs/${id}`),
  getByUser: (userId) => api.get(`/blogs/user/${userId}`),
  update: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  delete: (id) => api.delete(`/blogs/${id}`),
};
