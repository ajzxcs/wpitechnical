import React, { useState } from 'react';
import './Track.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TRACK_TICKET } from './firebase/Database'


function Track({ setTicketView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data,setData] = useState([])


  const handleSearch = () => {

    setData([])
    

    TRACK_TICKET(searchTerm)
    .then(result=>result.map(e=>setData(e)))
    .catch(error=>console.log(error))



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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {(data && (data.name || data.status || data.schedule)) ? (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Name: {data.name}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Status:</h2>
        <p style={{ color: 'green', marginLeft: '0.5rem', marginBottom: '0' }}><strong>{data.status}</strong></p>
      </div>
      <h3 style={{ marginBottom: '1rem' }}>Schedule: {data.schedule}</h3>
    </div>
  ) : (
    <p style={{ color: 'red', marginLeft: '0.5rem', marginBottom: '0' }}>No Data Found</p>
  )}
</div>

    </div>
  );
}

export default Track;
