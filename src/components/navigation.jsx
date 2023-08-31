import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Wellness Pro Inc.
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#brand" className="page-scroll">
                Brands 
              </a>
              
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About <span class="arrow-down">&#9662;</span>
              </a>
              <ul class="sub-menu">
                 <li><a href="/">Open</a></li>
                 <li><a href="/">Open</a></li>
                 <li><a href="/">Open</a></li>
             </ul>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#forum" className="page-scroll">
                Forum
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <a style={{ color: 'blue'}} href="/Login" className="page-scroll">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
