import React, { useState } from 'react';
import './Track.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Track({ setTicketView }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Add your search logic here
    console.log('Searching for:', searchTerm);
    // You can implement the actual search functionality here
  };

  return (
    <div className="card-form">
      <div className="square-search-bar">
        <input
          type="text"
          placeholder="Serial Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>
      
      <button className="go-back-button" onClick={() => setTicketView(true)}>
       <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <button className="search-button" onClick={handleSearch}>
      Track
    </button>
    <br></br><br></br><br></br>
    <h2>Status:</h2><p className="status">Pending</p>
    <h3>Schedule: 2023-09-26</h3>
    <h3>Name: AJ De Roque</h3>
    </div>
  );
}

export default Track;
