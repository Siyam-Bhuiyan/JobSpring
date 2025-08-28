import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { companyAPI } from "../../api/services";

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await companyAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await companyAPI.create(companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create company"
      );
    }
  }
);

const initialState = {
  companies: [],
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      });
  },
});

export const { clearError } = companySlice.actions;
export default companySlice.reducer;
