import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchAdminDashboard = createAsyncThunk(
  'admin/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/admin/dashboard');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/admin/users', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/admin/users/${id}/status`, { status });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAdminJobs = createAsyncThunk(
  'admin/fetchJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/admin/jobs', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAdminJob = createAsyncThunk(
  'admin/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/jobs/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAdminCompanies = createAsyncThunk(
  'admin/fetchCompanies',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/admin/companies', { params });
      return res.data.companies;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCompanyStatus = createAsyncThunk(
  'admin/updateCompanyStatus',
  async ({ id, status, verified }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/admin/companies/${id}/status`, { status, verified });
      return res.data.company;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAdminReports = createAsyncThunk(
  'admin/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/admin/reports');
      return res.data.reports;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  stats: null,
  monthlyStats: [],
  applicationStatusCounts: [],
  users: [],
  totalUsers: 0,
  jobs: [],
  totalJobs: 0,
  companies: [],
  reports: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.monthlyStats = action.payload.monthlyStats;
        state.applicationStatusCounts = action.payload.applicationStatusCounts;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.users = state.users.map((u) => (u._id === updated._id ? updated : u));
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.total;
      })
      .addCase(deleteAdminJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
      })
      .addCase(fetchAdminCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addCase(updateCompanyStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.companies = state.companies.map((c) => (c._id === updated._id ? updated : c));
      })
      .addCase(fetchAdminReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      });
  },
});

export default adminSlice.reducer;

