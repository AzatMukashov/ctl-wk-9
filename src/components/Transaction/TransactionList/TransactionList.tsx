import React from 'react';
import TransactionItem from '../TransactionItem/TransactionItem.tsx';

interface Transaction {
  id: string;
  createdAt: string;
  categoryName: string;
  type: 'income' | 'expense';
  amount: number;
}

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

const TransactionList: React.FC<Props> = ({transactions, onEdit}) => {
  return (
    <ul>
      {transactions
        .sort((a, b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate())
        .map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
          />
        ))}
    </ul>
  );
};

export default TransactionList;