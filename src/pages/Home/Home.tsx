import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import config from '../../config';
import SearchInput from '../../components/SearchInput';
import useDebounce from '../../hooks/useDebounce';
import BooksList from '../../components/BooksList/BooksList';
import Spinner from '../../components/Spinner';

const DEFAULT_PAGE_LIMIT = 10;

export function Home() {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, handleSetSearchQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const [pageLimit, setPageLimit] = React.useState(DEFAULT_PAGE_LIMIT);

  const handleChange = (event: any) => {
    setPageLimit(event.target.value);
  };

  const handleSearch = useCallback(() => {
    setLoadingData(true);
    setSearchError('');
    fetch(`${config.SEARCH_API}${debouncedSearchTerm}&page=${page}&limit=${pageLimit}`)
      .then((response) => response.json())
      .then(({ docs, numFound }) => {
        setTotalRecords(numFound);
        setSearchError('');
        setLoadingData(false);
        setSearchResults(docs);
      })
      .catch((e) => {
        setPage(1);
        setTotalRecords(0);
        setSearchError('There was an error while performing this search.');
        setLoadingData(false);
        setSearchResults([]);
      });
  }, [debouncedSearchTerm, page, pageLimit]);

  useEffect(() => {
    if (debouncedSearchTerm.length && debouncedSearchTerm.length > 3) {
      handleSearch();
    }
  }, [debouncedSearchTerm, page, handleSearch]);

  return (
    <>
      <div className="container">
        <SearchInput searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />

        <div>
          {searchResults.length ? (
            <div className="flex flex-sb">
              <ReactPaginate
                onPageChange={({ selected }) => {
                  setPage(selected === 0 ? 1 : selected + 1);
                }}
                containerClassName={'pagination'}
                initialPage={page - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                activeClassName={'active'}
                pageCount={Math.ceil(totalRecords / pageLimit)}
              />
              <div>
                <label>Number of books: </label>
                <select value={pageLimit} onChange={handleChange} className="number-of-books">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          ) : null}

          {loadingData ? <Spinner /> : <BooksList books={searchResults} />}
          {searchError ? <div>{searchError}</div> : null}
        </div>
      </div>
    </>
  );
}
