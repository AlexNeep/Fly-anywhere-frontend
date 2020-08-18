import React, { Component } from "react";

import "./Types.css";
export default class Types extends Component {
  decodeHolidayType = (needle_id, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === needle_id) {
        return [array[i].main_type, array[i].secondary_type];
      }
    }
    return ["None", "None"];
  };
  render() {
    let holiday_types = this.decodeHolidayType(
      this.props.flight.destination,
      this.props.locations
    );
    let main_type = holiday_types[0];
    let secondary_type = holiday_types[1];
    return (
      <div className="type">
        <img
          alt={`This locations main type is ${main_type}`}
          src={require(`../../../images/${main_type}.svg`)}
        />
        <img
          style={{ visibility: secondary_type === "None" ? "hidden" : "" }}
          alt={`This locations secondary type is ${secondary_type}`}
          src={require(`../../../images/${secondary_type}.svg`)}
        />
      </div>
    );
  }
}
