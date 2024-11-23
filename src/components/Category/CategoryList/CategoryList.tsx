import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem.tsx';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface Props {
  categories: Category[];
}

const CategoryList: React.FC<Props> = ({categories}) => {
  return (
    <ul>
      {categories.map(category => (
        <CategoryItem key={category.id} category={category}/>
      ))}
    </ul>
  );
};

export default CategoryList;