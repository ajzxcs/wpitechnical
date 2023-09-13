import React from "react";
import { useNavigate } from "react-router-dom";


export const Forum = (props) => {
  const navigate = useNavigate()
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
        </div><br></br><br></br><br></br>
        <div className="text-center">
          <button onClick={()=>navigate("/Forum")} className="btn-forum">View Forum</button>
        </div>
      </div>
    </div>
  );
};
