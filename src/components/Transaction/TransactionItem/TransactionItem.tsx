import React from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store.ts';
import { deleteTransaction } from '../transactionActions.ts';

interface Transaction {
  id: string;
  createdAt: string;
  categoryName: string;
  type: 'income' | 'expense';
  amount: number;
}

interface Props {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<Props> = ({transaction, onEdit}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleEditClick = () => {
    onEdit(transaction);
  };
  const handleDeleteClick = () => {
    dispatch(deleteTransaction(transaction.id));
  }
  return (
    <li>
      <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
      <span>{transaction.categoryName}</span>
      <span>{transaction.type === 'income' ? '+' : '-'}{transaction.amount} KGS</span>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};

export default TransactionItem;