import { configureStore } from '@reduxjs/toolkit';
import bookSlice from '../features/books/bookSlice';
import userSlice from '../features/user/userSlice';
import signupSlice from '../features/user/signupSlice';
import sessionsSlice from '../features/user/sessionsSlice';
import categoriesSlice from '../features/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    books: bookSlice,
    user: userSlice,
    signup: signupSlice,
    sessions: sessionsSlice,
    categories: categoriesSlice,
  },
});

export default store;
