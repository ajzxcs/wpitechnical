import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
          Our dedication to our services is unwavering, and our commitment to excellence will continue to drive us forward.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
                
              ))
              
            : "loading"}
        </div>
        <a href="https://wellnessproinc-ticket-request.web.app/">
        <button className="btn-forum">Submit a Ticket?</button></a>
      </div>
    </div>
  );
};
