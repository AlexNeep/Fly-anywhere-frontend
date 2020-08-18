import React, { Component } from "react";

import "./FlightInfo.css";
export default class FlightInfo extends Component {
  render() {
    return (
      <div className="flight-info">
        <div className="city">{this.props.destination}</div>

        <div className="country">{this.props.country}</div>
        <div className="carrier">{this.props.carrier}</div>
      </div>
    );
  }
}
