import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store.ts';
import { fetchCategories } from '../components/Category/categoriesSlice.ts';
import CategoryList from '../components/Category/CategoryList/CategoryList.tsx';
import { addCategory } from '../components/Category/categoryActions.ts';
import CategoryForm from '../components/Category/CategoryForm/CategoryForm.tsx';

interface Category {
  id?: string;
  name: string;
  type: 'income' | 'expense';
}

const CategoriesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleAddClick = () => {
    setSelectedCategory(undefined);
    setIsModalOpen(true);
  };
  const handleSaveCategory = (category: Category) => {
    dispatch(addCategory(category));
    setIsModalOpen(false);
  }
  return (
    <div>
      <button onClick={handleAddClick}>Add</button>
      <CategoryList categories={categories}/>
      {isModalOpen && (
        <CategoryForm
          category={selectedCategory}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPage;