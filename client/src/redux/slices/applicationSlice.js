import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applicationAPI } from "../../api/services";

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await applicationAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

export const createApplication = createAsyncThunk(
  "applications/createApplication",
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await applicationAPI.create(applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create application"
      );
    }
  }
);

export const createApplicationForJob = createAsyncThunk(
  "applications/createForJob",
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await applicationAPI.createForJob(
        jobId,
        applicationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create application"
      );
    }
  }
);

export const createApplicationByUserAndJob = createAsyncThunk(
  "applications/createByUserAndJob",
  async ({ userId, jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await applicationAPI.createByUserAndJob(
        userId,
        jobId,
        applicationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create application"
      );
    }
  }
);

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createApplicationByUserAndJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplicationByUserAndJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplicationByUserAndJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createApplicationForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplicationForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplicationForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
