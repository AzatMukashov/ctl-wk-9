import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosAPI.get('/categories.json');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category: Category) => {
  const response = await axiosAPI.post('/categories.json', category);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({id, category}: {id: string, category: Category}) => {
  const response = await axiosAPI.put(`/categories/${id}.json`, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: string) => {
  await axiosAPI.delete(`/categories/${id}.json`);
  return id;
});