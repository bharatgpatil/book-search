import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  searchQuery: string;
  handleSetSearchQuery: (search: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, handleSetSearchQuery }) => {
  return (
    <div className="search-form-elem bg-white">
      <input
        className="form-control"
        type="text"
        name="search"
        id="search"
        placeholder="Search books"
        autoFocus
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          handleSetSearchQuery(target.value);
        }}
        value={searchQuery}
      />
    </div>
  );
};

export default SearchInput;
