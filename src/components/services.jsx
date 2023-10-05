import React, { useState } from "react";
import { viewSERVICES } from '../Features/firebase/Database';

export const Services = (props) => {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const fetching = await viewSERVICES();
      setData(fetching);
    }
    fetchData();
  }, []);

  // Define an array of icon class names
  const icons = ["fa-calendar", "fa-globe", "fa-users", "fa-laptop", "fa-book", "fa-star"];

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Our dedication to our services is unwavering, and our commitment to excellence will continue to drive us forward.</p>
        </div>
        <div className="row">
          {data ? (
            Object.values(data).map((datas, key) => (
              <div key={key} className="col-md-4">
                {/* Use the icons array to select an icon based on the component's index */}
                <i className={`fa ${icons[key]}`}></i>
                <div className="service-desc">
                  <h3>{Object.values(datas)[1]}</h3>
                  <p>{Object.values(datas)[0]}</p>
                </div>
              </div>
            ))
          ) : (
            "loading"
          )}
        </div>
        <a href="https://wellnessproinc-ticket-request.web.app/">
          <button className="btn-forum">Submit a Ticket?</button>
        </a>
      </div>
    </div>
  );
};
