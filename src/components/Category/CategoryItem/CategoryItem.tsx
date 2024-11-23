import React from 'react';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface Props {
  category: Category;
}

const CategoryItem: React.FC<Props> = ({category}) => {
  return (
    <li>
      <span>{category.name}</span>
      <span>{category.type}</span>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default CategoryItem;