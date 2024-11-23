import React, { useState } from 'react';

interface Category {
  id?: string;
  name: string;
  type: 'income' | 'expense';
}

interface Props {
  category?: Category;
  onSave: (category: Category) => void;
}

const CategoryForm: React.FC<Props> = ({category, onSave}) => {
  const [name, setName] = useState(category?.name || '');
  const [type, setType] = useState<Category['type']>(category?.type || 'income');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...category,
      name,
      type,
    } as Category);
  };
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Тип:
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Category['type'])}
          >
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CategoryForm;