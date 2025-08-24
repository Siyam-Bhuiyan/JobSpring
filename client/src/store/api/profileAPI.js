import api from "./index";

// Get current user's profile
export const getMyProfile = () => {
  return api.get("/profiles/my-profile");
};

// Get public profile by user ID
export const getPublicProfile = (userId) => {
  return api.get(`/profiles/user/${userId}`);
};

// Update current user's profile
export const updateProfile = (profileData) => {
  return api.put("/profiles/my-profile", profileData);
};

// Upload profile picture
export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/profiles/my-profile/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Upload CV/Resume
export const uploadCV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/profiles/my-profile/cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete profile picture
export const deleteProfilePicture = () => {
  return api.delete("/profiles/my-profile/profile-picture");
};

// Delete CV
export const deleteCV = () => {
  return api.delete("/profiles/my-profile/cv");
};

// Delete entire profile
export const deleteProfile = () => {
  return api.delete("/profiles/my-profile");
};
