import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { debounce } from "lodash";

//service
import { searchArticles } from "../../services/articlesService";

// Styles
import styles from "./SearchBar.module.scss";
import { FaSearch, FaKeyboard } from "react-icons/fa";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query) => {
      searchArticles(query).then(
        (articles) => {
          setSuggestions(articles);
        },
        (error) => {
          console.error("Failed to search articles:", error);
        }
      );
    }, 1000),
    []
  );

  useEffect(() => {
    if (searchQuery !== "") {
      debouncedSearch(searchQuery);
    } else {
      setSuggestions([]);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchQuery]);

  const handleInputChange = (newValue) => {
    setSearchQuery(newValue);
  };

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      navigate(`/app/article/${selectedOption._id}`);
    }
  };

  const formatOptionLabel = ({ title }) => <div>{title}</div>;

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "var(--color-text)",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      color: "var(--color-text)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--color-text)",
      backgroundColor: "transparent",
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--color-text)",
    }),
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__inputContainer}>
        <FaSearch className={styles.searchBar__icon} />
        <Select
          options={suggestions}
          inputValue={searchQuery}
          onInputChange={handleInputChange}
          onChange={handleSelect}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          formatOptionLabel={formatOptionLabel}
          placeholder="Search"
          isClearable
          isSearchable
          className={styles.searchBar__input}
          styles={customStyles}
        />
        <FaKeyboard className={styles.searchBar__icon} />
      </div>
    </div>
  );
};

export default SearchBar;
