import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

interface Transaction {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
}

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
    const response = await axiosAPI.get('/transactions.json');
    return response.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export default transactionsSlice.reducer;