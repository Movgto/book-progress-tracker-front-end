import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchBooks, deleteBook as remove, updateBook } from '../features/books/bookSlice';
import BookUpdatePopup from './BookUpdatePopup';
import BookEditPopup from './BookEditPopup';

const BookItem = ({ book }) => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  function openEditPopup() {
    setEditPopup(true);
  }

  function closeEditPopup() {
    setEditPopup(false);
  }

  function closePopup() {
    setPopup(false);
  }

  function openPopup() {
    setPopup(true);
  }

  const removeBook = (id) => {
    dispatch(remove(id))
      .then(() => dispatch(fetchBooks(book.user_id)));
  };

  return (
    <div className="Lesson-Panel" key={book.id} id={(`book${book.id}`)}>
      {popup ? <BookUpdatePopup closePopup={closePopup} book={book} /> : null}
      {editPopup ? <BookEditPopup closeEditPopup={closeEditPopup} book={book} /> : null}
      <div className="book-info">
        <h3 className="Title Text-Style-5">{book.title}</h3>
        <h3 className="Author Text-Style-8">{book.author}</h3>
        <div className="book-opt">
          <button className="delete" type="button" onClick={() => removeBook(book.id)}>Delete</button>
          <div className="Line-2" />
          <button className="delete" type="button" onClick={openEditPopup}>Edit</button>
        </div>
      </div>
      <div className="progress-ctr">
        <div className="progress">
          <div className="percentage-ctr">
            <span className="percentage">
              {Math.round((book.current_chapter / book.total_chapters) * 100)}
              %
            </span>
            <span className="completed">Completed</span>
          </div>
        </div>
        <div className="progress-line" />
        <div className="chapter-ctr">
          <span className="current-chapter">CURRENT CHAPTER</span>
          <span className="chapter-name">
            Chapter
            {' '}
            {book.current_chapter}
          </span>
          <button type="button" onClick={openPopup}>UPDATE PROGRESS</button>
        </div>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookItem;
