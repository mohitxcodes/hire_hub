import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/jobs', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/jobs/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchFeaturedJobs = createAsyncThunk(
  'jobs/fetchFeaturedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/jobs/featured');
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchJobStats = createAsyncThunk(
  'jobs/fetchJobStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/jobs/stats/overview');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRecommendedJobs = createAsyncThunk(
  'jobs/fetchRecommendedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/users/recommended-jobs');
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSavedJobs = createAsyncThunk(
  'jobs/fetchSavedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/users/saved-jobs');
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleSaveJob = createAsyncThunk(
  'jobs/toggleSaveJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await API.post(`/users/saved-jobs/${jobId}`);
      return { jobId, isSaved: res.data.isSaved };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await API.post('/jobs', jobData);
      return res.data.job;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/jobs/${id}`, jobData);
      return res.data.job;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/jobs/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRecruiterJobs = createAsyncThunk(
  'jobs/fetchRecruiterJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/jobs/recruiter/my-jobs');
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  jobs: [],
  totalJobs: 0,
  totalPages: 1,
  currentPage: 1,
  currentJob: null,
  relatedJobs: [],
  featuredJobs: [],
  recommendedJobs: [],
  savedJobs: [],
  recruiterJobs: [],
  stats: null,
  categories: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null;
      state.relatedJobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload.job;
        state.relatedJobs = action.payload.relatedJobs || [];
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Featured Jobs
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.featuredJobs = action.payload;
      })
      // Stats & Categories
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.categories = action.payload.categories;
      })
      // Recommended Jobs
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.recommendedJobs = action.payload;
      })
      // Saved Jobs
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      })
      // Toggle Save
      .addCase(toggleSaveJob.fulfilled, (state, action) => {
        const { jobId, isSaved } = action.payload;
        if (!isSaved) {
          state.savedJobs = state.savedJobs.filter((j) => j._id !== jobId);
        }
      })
      // Recruiter Jobs
      .addCase(fetchRecruiterJobs.fulfilled, (state, action) => {
        state.recruiterJobs = action.payload;
      })
      // Delete Job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.recruiterJobs = state.recruiterJobs.filter((j) => j._id !== action.payload);
      });
  },
});

export const { clearCurrentJob } = jobSlice.actions;
export default jobSlice.reducer;

