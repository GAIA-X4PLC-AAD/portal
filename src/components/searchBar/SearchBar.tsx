import { ChangeEvent, FC, useState } from 'react';

import styles from './SearchBar.module.css';

interface ISearchBar {
    placeholder: string;
    onSearch: (query: string) => void;
}

const SearchBar: FC<ISearchBar> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar;
