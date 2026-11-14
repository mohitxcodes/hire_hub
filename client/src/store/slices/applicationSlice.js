import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const applyForJob = createAsyncThunk(
  'applications/apply',
  async ({ jobId, data }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/applications/${jobId}`, data);
      return res.data.application;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/applications/my-applications');
      return res.data.applications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchJobApplicants = createAsyncThunk(
  'applications/fetchJobApplicants',
  async ({ jobId, params = {} }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/applications/job/${jobId}`, { params });
      return res.data.applications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllRecruiterApplicants = createAsyncThunk(
  'applications/fetchAllRecruiterApplicants',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/applications/recruiter/all', { params });
      return res.data.applications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/applications/${id}/status`, statusData);
      return res.data.application;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const withdrawApplication = createAsyncThunk(
  'applications/withdraw',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/applications/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  myApplications: [],
  recruiterApplicants: [],
  jobApplicants: [],
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Apply
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications.unshift(action.payload);
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // My applications
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Recruiter applicants
      .addCase(fetchAllRecruiterApplicants.fulfilled, (state, action) => {
        state.recruiterApplicants = action.payload;
      })
      .addCase(fetchJobApplicants.fulfilled, (state, action) => {
        state.jobApplicants = action.payload;
      })
      // Update status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.recruiterApplicants = state.recruiterApplicants.map((app) =>
          app._id === updated._id ? updated : app
        );
      })
      // Withdraw
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.myApplications = state.myApplications.filter((app) => app._id !== action.payload);
      });
  },
});

export default applicationSlice.reducer;

