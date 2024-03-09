import { useEffect } from 'react';
import '../stylesheets/books.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import BookItem from './BookItem';
import Form from './Form';

const Books = () => {
  const books = useSelector((state) => state.books.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user == null) return;
    dispatch(fetchBooks(user.id));
  }, [dispatch]);

  return (
    <div id="books-ctr">
      <div id="booklist">
        {
          books.map((book) => (
            <BookItem book={book} key={book.id} />
          ))
        }
      </div>
      <div id="line-1" />
      <Form />
    </div>
  );
};

export default Books;
