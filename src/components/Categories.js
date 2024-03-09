import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory } from '../features/categories/categoriesSlice';
import '../stylesheets/categories.scss';

const Categories = () => {
  const { data, error } = useSelector((state) => state.categories);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()).then(({ payload }) => {
      console.log('Fetch categories response:', payload);
    });
    console.log('Categories from categores component:', data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addCategory({
      name,
    }));
  };
  return (
    <div id="categories-ctr">
      <h2 id="categories-title">Categories</h2>
      <ul id="categories-list">
        {data.map((c) => (<li>{c.name}</li>))}
      </ul>
      {error ? <span id="categories-error">{error}</span> : null}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value); }} required />
        <button type="submit">Add new category</button>
      </form>
    </div>
  );
};

export default Categories;
