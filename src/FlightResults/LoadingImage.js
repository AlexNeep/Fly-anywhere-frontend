import React, { Component } from "react";

import loading_img from "../images/TravelMate.svg";

export default class LoadingImage extends Component {
  render() {
    return (
      <div
        style={{
          display: this.props.request.origin === "" ? "block" : "none",
        }}
      >
        <img className="loading-img" alt="loading" src={loading_img} />
        <h3 className="dark"> Find your next (affordable) holiday</h3>
      </div>
    );
  }
}
