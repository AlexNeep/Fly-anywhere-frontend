import React, { Component } from "react";

import LocationChoice from "./LocationChoice/LocationChoice";
import { TextField } from "@material-ui/core";

import "./DataSelectionColumn.css";
export default class DataSelectionColumn extends Component {
  render() {
    return (
      <div className="selection-col">
        <div className="container">
          <LocationChoice
            title="Origin"
            clickHandler={this.props.updateOrigin}
            origin={this.props.origin}
            code={this.props.code}
          />
          <div className="selection-item">
            <div className="title">Outbound date</div>
            <TextField
              id="date"
              type="date"
              value={this.props.outbound}
              onChange={(event) =>
                this.props.updateOutbound(event.target.value)
              }
              color="primary"
              InputLabelProps={{
                shrink: false,
              }}
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div className="selection-item">
            <div className="title">Budget</div>
            <input
              type="range"
              min="10"
              max="501"
              value={this.props.budget}
              className="budget-slider"
              onChange={(event) => this.props.updateBudget(event.target.value)}
            />
            <div>
              <input
                className="budget-input"
                value={this.props.budget === 10000 ? "max" : this.props.budget}
                style={{ color: this.props.budget === 10000 ? "red" : "" }}
                onChange={(event) =>
                  this.props.updateBudget(event.target.value)
                }
              />
            </div>
          </div>

          <div className="selection-item">
            <button
              className="selection-button"
              onClick={() => this.props.findFlights()}
            >
              Find Flights
            </button>
          </div>
        </div>
      </div>
    );
  }
}
