import React, { useState } from 'react';
import { Transaction } from '../../Transaction/transactionActions.ts';

interface Props {
  transaction?: Transaction;
  onSave: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({transaction, onSave}) => {
  const [type, setType] = useState<Transaction['type']>(transaction?.type || 'income');
  const [category, setCategory] = useState(transaction?.category || '');
  const [amount, setAmount] = useState(transaction?.amount.toString() || '');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...transaction,
      type,
      category,
      amount: parseFloat(amount),
      createdAt: transaction?.createdAt || new Date().toISOString(),
    } as Transaction);
  };
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Тип:
          <select value={type} onChange={(e) => setType(e.target.value as Transaction['type'])}>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </label>
        <label>
          Категория:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Сумма (KGS):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TransactionForm;