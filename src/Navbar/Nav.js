import React, { Component } from "react";

import logo from "../images/TravelMate_text.svg";
import "./Navbar.css";

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <img className="logo" alt="logo" src={logo} />
        {/* </div> */}
        <div className="nav-links">
          {/* <div className="nav-link">Link 1</div>
          <div className="nav-link">Link 2</div> */}
          <a
            href="https://www.buymeacoffee.com/AlexNeep"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="nav-button">Support my work!</button>
          </a>
        </div>
      </div>
    );
  }
}
