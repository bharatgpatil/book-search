import React, { useState } from 'react';
import '../BookItem.css';
import Modal from '../../Modal';

import Book from '../../../types/Book';

interface BookItemProps {
  book: Book;
}

export const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cover_img = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : '';
  const handleClick = () => {
    //
  };

  return (
    <div className="book-item flex flex-column flex-sb" onClick={handleClick}>
      <div className="book-item-img">
        {cover_img ? <img src={cover_img} alt="cover" onClick={() => setIsOpen(true)} /> : null}
      </div>
      <div className="book-item-info text-center">
        <div className="book-item-info-item title fw-7 fs-18">
          <span>{book.title}</span>
        </div>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          <span>{book.author_name ? book.author_name.join(', ') : null}</span>
        </div>

        <div className="book-item-info-item publish-year fs-15">
          <span className="text-capitalize fw-7">First Publish Year: </span>
          <span>{book.first_publish_year}</span>
        </div>
      </div>

      {isOpen && <Modal setIsOpen={setIsOpen} img={cover_img} />}
    </div>
  );
};

export default BookItem;
