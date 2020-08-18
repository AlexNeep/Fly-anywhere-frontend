import React, { Component } from "react";
import ToggleSection from "../DataSelectionColumn/ToggleSection/ToggleSection";

export default class FlightResultsFilter extends Component {
  render() {
    return (
      <div className="details">
        <div
          className="origin"
          style={{
            display: this.props.request.origin === "" ? "none" : "block",
          }}
        >
          Showing you flights from <span>{this.props.request.origin}</span>
        </div>
        <div
          className="date"
          style={{
            display: this.props.request.origin === "" ? "none" : "block",
          }}
        >
          Outbound date: <span>{this.props.request.outbound}</span>
        </div>
        <ToggleSection
          display={this.props.request.origin === "" ? "none" : "block"}
          holiday_type={this.props.holiday_type}
          updateHolidayType={this.props.updateHolidayType}
        />
      </div>
    );
  }
}
