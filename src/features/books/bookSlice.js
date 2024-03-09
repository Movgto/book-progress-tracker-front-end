import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../apiURLS';

const BOOKS_URL = `${BASE_URL}/books`;

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const fetchBooks = createAsyncThunk('books/fetchBooks', async (user_id, { rejectWithValue }) => {
  try {
    const req = await axios.get(`${BOOKS_URL}?user_id=${user_id}`);
    const res = req.data;
    return res;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const updateBook = createAsyncThunk('books/updateBook', async ({ book, book_id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${BOOKS_URL}/${book_id}`, book);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const addBook = createAsyncThunk('books/addBook', async (book) => {
  try {
    const response = await axios.post(BOOKS_URL, book);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${BOOKS_URL}/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchBooks.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })

      .addCase(addBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBook.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addBook.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })

      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteBook.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })

      .addCase(updateBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateBook.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export {
  fetchBooks, addBook, deleteBook, updateBook,
};
export default bookSlice.reducer;
