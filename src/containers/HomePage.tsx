import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store.ts';
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../components/Transaction/transactionsSlice.ts';
import TransactionList from '../components/Transaction/TransactionList/TransactionList.tsx';
import TransactionForm from '../components/Transaction/TransactionForm/TransactionForm.tsx';
import { addTransaction, updateTransaction } from '../components/Transaction/transactionActions.ts';
import {Transaction} from './../components/Transaction/transactionActions.ts';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  const total = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  const handleAddClick = () => {
    setSelectedTransaction(undefined);
    setIsModalOpen(true);
  }
  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction as Transaction);
    setIsModalOpen(true);
  }
  const handleSaveTransaction = (transaction: Transaction) => {
    if (transaction.id) {
      dispatch(updateTransaction({id: transaction.id, transaction}));
    } else {
      dispatch(addTransaction(transaction));
    }
    setIsModalOpen(false);
  };
  return (
    <div>
      <nav>
        <a href="/categories">Categories</a>
        <button onClick={handleAddClick}>Add</button>
      </nav>
      <div>
        <h1>Total: {total} KGS</h1>
        <TransactionList
          transactions={transactions}
          onEdit={handleEditClick}
        />
      </div>
      {isModalOpen && (
        <TransactionForm
          transaction={selectedTransaction}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
};

export default HomePage;