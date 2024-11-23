import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

interface Transaction {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: string;
}

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
  const response = await axiosAPI.get('/transactions.json');
  return response.data;
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (transaction: Transaction) => {
  const response = await axiosAPI.post('/transactions.json', transaction);
  return response.data;
});

export const updateTransaction = createAsyncThunk('transactions/updateTransaction', async ({id, transaction}: {id: string, transaction: Transaction}) => {
  const response = await axiosAPI.put(`/transactions/${id}.json`, transaction);
  return response.data;
});

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (id: string) => {
  await axiosAPI.delete(`/transactions/${id}.json`);
  return id;
})