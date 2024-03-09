import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, updateBook } from '../features/books/bookSlice';

const BookEditPopup = ({ book, closeEditPopup }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [categoryId, setCategoryId] = useState(book.category_id);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      book: {
        title,
        author,
        category_id: categoryId,
      },
      book_id: book.id
    };
    console.log('Book to update id:', book.id);
    dispatch(updateBook(payload)).then(() => {
      dispatch(fetchBooks(book.user_id));
    });
  };

  return (
    <div className="book-edit-popup-ctr">
      <form onSubmit={handleSubmit}>
        <h3 className='edit-book-title'>Edit book</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <select id="category" onChange={(e) => setCategoryId(e.target.value)}>
          <option value="" selected disabled hidden>Category</option>
          {data.map((c) => (<option value={c.id}>{c.name}</option>))}
        </select>
        <div className="edit-book-opts">
          <button type="submit">Save</button>
          <button type="button" onClick={closeEditPopup}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default BookEditPopup;
