import React from "react";

export const Forum = (props) => {
  return (
    <div id="forum">
      <div className="container">
        <div className="section-title text-center">
          <h2>Forums</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="forum">
                    <div className="forum-image">
                      {" "}
                      <img src={d.img} alt="" />{" "}
                    </div>
                    <div className="forum-content">
                      <p>"{d.text}"</p>
                      <div className="forum-meta"> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
