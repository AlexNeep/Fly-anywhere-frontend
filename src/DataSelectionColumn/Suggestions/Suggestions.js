import React, { Component } from "react";

import "./Suggestions.css";

export default class Suggestions extends Component {
  render() {
    let matchingLocations = this.props.locations.filter((location) => {
      return (
        this.props.origin !== "" &&
        location.name.toLowerCase().includes(this.props.origin.toLowerCase()) &&
        location.name.toLowerCase() !== this.props.origin.toLowerCase()
      );
    });
    return (
      <div
        className="suggestions"
        style={{
          display: matchingLocations.length > 0 ? "block" : "none",
        }}
      >
        <div className="contents">
          {matchingLocations.map((location, index) => (
            <div
              key={index}
              className="item"
              onClick={() =>
                this.props.clickHandler(location.name, location.code)
              }
            >
              <div>{location.name}</div>
              <div>{location.country}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
