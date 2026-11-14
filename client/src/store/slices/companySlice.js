import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/companies', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/companies/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMyCompany = createAsyncThunk(
  'companies/fetchMyCompany',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/companies/me/profile');
      return res.data.company;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const res = await API.post('/companies', companyData);
      return res.data.company;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  companies: [],
  currentCompany: null,
  companyJobs: [],
  recruiterCompany: null,
  totalCompanies: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.companies;
        state.totalCompanies = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.currentCompany = action.payload.company;
        state.companyJobs = action.payload.jobs;
      })
      .addCase(fetchMyCompany.fulfilled, (state, action) => {
        state.recruiterCompany = action.payload;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.recruiterCompany = action.payload;
      });
  },
});

export default companySlice.reducer;

