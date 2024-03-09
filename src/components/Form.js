import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, fetchBooks } from '../features/books/bookSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';

const Form = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { data, error } = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);
  const [categoryId, setCategoryId] = useState(-1);
  const dispatch = useDispatch();

  const addBookHandler = () => {
    console.log(user.data);
    const bookObj = {
      book: {
        title,
        author,
        category_id: categoryId,
        user_id: user.data.id,
      },
    };

    dispatch(addBook(bookObj))
      .then(() => dispatch(fetchBooks(user.data.id)));
    setAuthor('');
    setTitle('');
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div id="form-ctr">
      <h2>ADD NEW BOOK</h2>
      <form>
        <input id="title" type="text" placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input id="author" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <select id="category" onChange={(e) => setCategoryId(e.target.value)}>
          <option value="" selected disabled hidden>Category</option>
          {data.map((c) => (<option value={c.id}>{c.name}</option>))}
        </select>
        <button type="button" onClick={() => addBookHandler()}>ADD BOOK</button>
      </form>
    </div>
  );
};

export default Form;
