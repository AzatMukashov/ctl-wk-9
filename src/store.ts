import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './components/Transaction/transactionsSlice.ts';
import categoriesReducer from './components/Category/categoriesSlice.ts';
export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;