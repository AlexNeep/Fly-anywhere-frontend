import React, { Component } from "react";

import map from "../images/Map.svg";

export default class NoMatchingFlights extends Component {
  render() {
    return (
      <div
        style={{
          display:
            this.props.visible_flights.length === 0 &&
            this.props.request.origin !== ""
              ? "block"
              : "none",
        }}
      >
        <img className="loading-img" alt="No avaliable flights" src={map} />
        <h3 className="dark">No flights match your query</h3>
      </div>
    );
  }
}
