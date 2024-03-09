import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../apiURLS';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (empty, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  console.log(token);
  try {
    const { data } = await axios.get(`${BASE_URL}/current_user`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.data = null;
        state.error = payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

export { getCurrentUser };
