import React from "react";
import logo from "../imgsrc/wpilogo.png"
import 'animate.css';

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
       
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">       
                            <h1 style={{ color: '#fffffff' ,fontFamily: 'Now Alt, sans-serif' }}>
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
