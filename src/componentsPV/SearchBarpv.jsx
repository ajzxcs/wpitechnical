import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../assets/SearchBar.css";
import "../assets/public.css";
import samplePosts from "../data/samplePosts";

const SearchBar = ({ posts, onSearch }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("newest"); // Default to "newest"

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    onSearch(newValue); // Pass the search query to the parent component
  };

  const getSuggestions = (searchTerm) => {
    // Flatten and filter posts based on sorting order
    const filteredPosts = Object.values(posts)
      .filter(
        (postObject) =>
          postObject && postObject.Posts && postObject.Posts.length > 0
      )
      .map((postObject) => postObject.Posts[0])
      .filter(
        (post) =>
          post && post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter postObject titles
    const filteredPostObjectTitles = Object.values(posts)
      .filter(
        (postObject) =>
          postObject &&
          postObject.title &&
          postObject.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((postObject) => postObject.title);

    // Include titles from samplePosts as suggestions
    const samplePostTitles = Object.values(samplePosts)
      .filter(
        (postObject) =>
          postObject && postObject.Posts && postObject.Posts.length > 0
      )
      .map((postObject) => postObject.Posts[0].title);

    if (sortingOrder === "newest") {
      // Sort by newest date
      filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      // Sort by oldest date
      filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return [
      ...filteredPosts.map((post) => post.title),
      ...filteredPostObjectTitles,
      ...samplePostTitles // Include sample post titles as suggestions
    ];
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

  const toggleSortingOrder = () => {
    // Toggle between "newest" and "oldest"
    setSortingOrder(sortingOrder === "newest" ? "oldest" : "newest");
  };

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
