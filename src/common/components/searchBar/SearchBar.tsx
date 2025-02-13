import classnames from 'classnames';
import {ChangeEvent, FC, useState} from 'react';

import styles from './SearchBar.module.css';

interface ISearchBar {
    placeholder: string;
    onSearch: (query: string) => void;
    visible?: boolean;
}

const SearchBar: FC<ISearchBar> = ({ placeholder, onSearch, visible = true }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={classnames([visible ? styles.visible : styles.hidden, styles.searchBar])}>
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
