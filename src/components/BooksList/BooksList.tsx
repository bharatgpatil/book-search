import React from 'react';
import Book from '../../types/Book';
import BookItem from './BookItem/BookItem';
import './BookItem.css';

interface BooksListProps {
  books: Book[];
}

export const BooksList: React.FC<BooksListProps> = ({ books }) => {
  return (
    <div>
      {books.length ? (
        <section className="booklist">
          <div className="container">
            <div className="booklist-content grid">
              {books.map((book: Book) => {
                return <BookItem key={book.key} book={book} />;
              })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default BooksList;
