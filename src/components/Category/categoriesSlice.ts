import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axiosAPI.get('/categories.json');
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categoriesSlice.reducer;