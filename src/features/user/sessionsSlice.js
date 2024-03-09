import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../apiURLS';

const initialState = {
  loading: false,
  error: null,
};
const login = createAsyncThunk('sessions/login', async (userData, { rejectWithValue }) => {
  try {
    console.log(userData);
    const res = await axios.post(`${BASE_URL}/login`, userData);
    const token = res.headers.getAuthorization();
    console.log(token);
    const user = JSON.stringify(res.data.status.data);
    console.log('User:', user);

    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    return res.data.status.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

const logout = createAsyncThunk('sessions/logout', async (empty, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${BASE_URL}/logout`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default sessionsSlice.reducer;

export { login, logout };
