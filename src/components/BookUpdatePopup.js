import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchBooks, updateBook } from '../features/books/bookSlice';

const BookUpdatePopup = ({ closePopup, book }) => {
  const [currentChapter, setCurrentChapter] = useState(book.current_chapter);
  const [totalChapters, setTotalChapters] = useState(book.total_chapters);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      book: {
        total_chapters: totalChapters,
        current_chapter: currentChapter,
      },
      book_id: book.id,
    };
    dispatch(updateBook(payload)).then(() => {
      dispatch(fetchBooks(book.user_id));
    });
  };

  return (
    <div className="book-update-popup-ctr">
      <form onSubmit={handleSubmit}>
        <div className="update-book-inputs">
          <div className="update-book-input">
            <label>Total chapters</label>
            <input
              type="number"
              min="1"
              max="300"
              placeholder="Total chapters"
              value={totalChapters}
              onChange={(e) => setTotalChapters(e.target.value)}
              required
            />
          </div>
          <div className="update-book-input">
            <label>Current chapter</label>
            <input
              type="number"
              min="1"
              max={totalChapters}
              placeholder="Current chapter"
              value={currentChapter}
              onChange={(e) => setCurrentChapter(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="update-opts">
          <button type="submit">Update</button>
          <button className="close-popup" type="button" onClick={closePopup}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default BookUpdatePopup;
