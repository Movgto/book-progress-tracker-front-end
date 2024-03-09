import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../apiURLS';

const initialState = {
  data: [],
  error: null,
};

const fetchCategories = createAsyncThunk('categories/fetchCategories', async (empty, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);

    return res.data;
  } catch (err) {
    rejectWithValue(err.message);
  }
});

const addCategory = createAsyncThunk('categories/addCategory', async (category, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/categories`, category);

    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.data.push(payload);
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default categoriesSlice.reducer;
export { fetchCategories, addCategory };
