import {FC, useState} from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    placeholder: string;
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
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
