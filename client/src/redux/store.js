import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import companySlice from "./slices/companySlice";
import jobSlice from "./slices/jobSlice";
import applicationSlice from "./slices/applicationSlice";
import blogSlice from "./slices/blogSlice";
import profileSlice from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    companies: companySlice,
    jobs: jobSlice,
    applications: applicationSlice,
    blogs: blogSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
