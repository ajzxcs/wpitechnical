import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../assets/SearchBar.css"; // Create a SearchBar.css file for styling

const SearchBar = ({ posts, onSearch }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestions = (searchTerm) => {
    const matchingTitles = posts
      .filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((post) => post.title);

    return matchingTitles;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    onSearch(suggestion);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">{suggestion}</div>
  );

  const inputProps = {
    placeholder: "Search posts...",
    value,
    onChange: handleInputChange
  };

  return (
    <div className="search-bar">
      <div className="search-icon">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={{
          container: "autosuggest-container",
          suggestionsContainer: "suggestions-container",
          suggestionsList: "suggestions-list"
        }}
      />
    </div>
  );
};

export default SearchBar;
