import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as profileAPI from '../api/profileAPI';

// Async thunks
export const getMyProfile = createAsyncThunk(
  'profile/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getMyProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const getPublicProfile = createAsyncThunk(
  'profile/getPublicProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getPublicProfile(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'profile/uploadProfilePicture',
  async (file, { rejectWithValue }) => {
    try {
      const response = await profileAPI.uploadProfilePicture(file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload profile picture');
    }
  }
);

export const uploadCV = createAsyncThunk(
  'profile/uploadCV',
  async (file, { rejectWithValue }) => {
    try {
      const response = await profileAPI.uploadCV(file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload CV');
    }
  }
);

export const deleteProfilePicture = createAsyncThunk(
  'profile/deleteProfilePicture',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.deleteProfilePicture();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete profile picture');
    }
  }
);

export const deleteCV = createAsyncThunk(
  'profile/deleteCV',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.deleteCV();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete CV');
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      await profileAPI.deleteProfile();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
  }
);

const initialState = {
  profile: null,
  publicProfile: null,
  loading: false,
  error: null,
  message: null,
  uploadProgress: 0
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearProfileMessage: (state) => {
      state.message = null;
    },
    clearPublicProfile: (state) => {
      state.publicProfile = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get My Profile
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Public Profile
      .addCase(getPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProfile = action.payload;
        state.error = null;
      })
      .addCase(getPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'Profile updated successfully!';
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload Profile Picture
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'Profile picture uploaded successfully!';
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      
      // Upload CV
      .addCase(uploadCV.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadCV.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'CV uploaded successfully!';
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      
      // Delete Profile Picture
      .addCase(deleteProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'Profile picture deleted successfully!';
        state.error = null;
      })
      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete CV
      .addCase(deleteCV.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteCV.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'CV deleted successfully!';
        state.error = null;
      })
      .addCase(deleteCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.message = 'Profile deleted successfully!';
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearProfileError,
  clearProfileMessage,
  clearPublicProfile,
  setUploadProgress,
  resetUploadProgress
} = profileSlice.actions;

export default profileSlice.reducer;
