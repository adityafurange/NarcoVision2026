import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('vt_token', data.token);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signup', userData);
    localStorage.setItem('vt_token', data.token);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Signup failed');
  }
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Session expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('vt_token'),
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('vt_token');
    },
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const fulfilled = (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token || state.token;
      state.initialized = true;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.initialized = true;
    };
    builder
      .addCase(login.pending, pending).addCase(login.fulfilled, fulfilled).addCase(login.rejected, rejected)
      .addCase(signup.pending, pending).addCase(signup.fulfilled, fulfilled).addCase(signup.rejected, rejected)
      .addCase(fetchMe.pending, pending)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.token = null;
        localStorage.removeItem('vt_token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
