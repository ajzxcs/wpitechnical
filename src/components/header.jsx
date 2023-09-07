import React from "react";
import logo from "../imgsrc/wpilogo.png"
import 'animate.css';

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
        <img src={logo} alt="Logo" className="logosn" />
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">       
                            <h1 style={{ color: '#fffffff' }}>
  {props.data ? props.data.title : "Loading"}
  <span></span>
</h1>

                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#about"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
