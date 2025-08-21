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
      .addCase(createApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      });
  },
});

export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
