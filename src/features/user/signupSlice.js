import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../apiURLS';

const initialState = {
  success: '',
  loading: false,
  error: '',
};

const signup = createAsyncThunk('signup/signup', async (user, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, user);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data.status.message);
  }
});

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.success = 'You signed up successfully, you can now login';
        state.loading = false;
        state.error = '';
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.success = '';
        state.loading = false;
        state.error = payload;
      });
  },
});

export default signupSlice.reducer;

export { signup };
