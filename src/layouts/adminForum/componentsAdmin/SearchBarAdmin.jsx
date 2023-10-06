import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../assets/SearchBar.css";
import "../assets/public.css";

const SearchBar = ({ posts, onSearch }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const sortingOrder = "newest"; // Default to "newest"


  // ********** onSuggestionsFetchRequested
  const getSuggestions = (searchTerm) => {

    // Flatten and filter posts based on sorting order
    const filteredPosts = posts
      ?.filter((post) =>
        {return String(post.Title)?.toLowerCase().includes(searchTerm.toLowerCase())}
      );
  
  
    // Filter postObject titles
    const filteredPostObjectTitles = Object.values(posts)
      .filter(
          (postObject) =>
            postObject &&
            postObject.Title &&
            postObject.Title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((postObject) => postObject.Title);
  
        
      // Include titles from samplePosts as suggestions
    const samplePostTitles = posts?.map((postObject) => postObject.Title)
      .filter((title, index, self) => self.indexOf(title) === index);
  
    // Sorting the Posts
    if (sortingOrder === "newest") {
      // Sort by newest date
      filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      // Sort by oldest date
      filteredPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  
  
      console.log(samplePostTitles)
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


  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    onSearch(newValue); // Pass the search query to the parent component
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
