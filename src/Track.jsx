import React, { useState, useEffect } from 'react';
import './Track.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TRACK_TICKET } from './firebase/Database';

function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'red';
    case 'process':
      return 'orange';
    case 'done':
      return 'green';
    default:
      return 'black'; // Change to the default color you prefer
  }
}

function Track({ setTicketView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true); // Set loading state to true

    // Simulate a delay of 3 seconds before updating data
    setTimeout(() => {
      setData([]);

      TRACK_TICKET(searchTerm)
        .then((result) => result.map((e) => setData(e)))
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false); // Set loading state to false after the data is loaded
        });
    }, 1000); // 3-second delay
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

      <button className="search-button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Track'}
      </button>

      <br />
      <br />
      <br />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left' }}>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {data && (data.name || data.status || data.schedule) ? (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Name: {data.name}</h2>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2>Status:</h2>
                  <p style={{ color: getStatusColor(data.status), marginLeft: '0.5rem', marginBottom: '0' }}>
                    <strong>{data.status}</strong>
                  </p>
                </div>
                <h2 style={{ color: 'blue' }}>Schedule: {data.schedule}</h2>
              </div>
            ) : (
              <p style={{ color: 'red', marginBottom: '0', animation: 'bounce 2s infinite' }} className='bounce-once'>
                No Data Found
              </p>
            )}
          </>
        )}
      </div>

      <div className="footer-text">
        <p className="copyright-text">Copyright © 2023 Wellness Pro Inc All rights reserved</p>
      </div>

    </div>
  );
}

export default Track;
