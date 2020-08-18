import React, { Component } from "react";
import "./Footer.css";
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        Made with ❤ by&nbsp;
        <a
          href="https://alexneep.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alex Neep
        </a>
      </footer>
    );
  }
}
