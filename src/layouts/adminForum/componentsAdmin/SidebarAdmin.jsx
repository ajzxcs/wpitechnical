import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock } from "@fortawesome/free-solid-svg-icons";
import "../assets/public.css";

const Sidebar = ({ onSelectPost, onNewestClick, onOldestClick }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section" onClick={() => onNewestClick()}>
        <FontAwesomeIcon icon={faFire} /> Popular
      </div>
      {/* <div className="sidebar-section" onClick={() => onNewestClick()}>
        <FontAwesomeIcon icon={faClock} /> Newest
      </div>*/}
    </aside>
  );
};

export default Sidebar;
