import React, { Component } from "react";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

export default class ToggleSection extends Component {
  state = {
    more: false,
  };
  toggleChange = (value) => {
    if (value === "More") {
      this.setState(() => ({ more: !this.state.more }));
    } else {
      if (value !== null) {
        this.props.updateHolidayType(value);
      }
    }
  };
  render() {
    return (
      <div className="selection-item" style={{ display: this.props.display }}>
        <ToggleButtonGroup
          value={this.props.holiday_type}
          exclusive
          onChange={(event, value) => this.toggleChange(value)}
        >
          <ToggleButton className="toggle" value="">
            <div className="toggle-element">All</div>
          </ToggleButton>
          <ToggleButton
            value="City"
            size="small"
            style={{ display: this.state.more ? "none" : "" }}
          >
            <div className="toggle-element">
              City{" "}
              <span role="img" aria-label="emoji">
                🏙
              </span>
            </div>
          </ToggleButton>
          <ToggleButton
            value="Beach"
            size="small"
            style={{ display: this.state.more ? "none" : "" }}
          >
            <div className="toggle-element">
              Beach{" "}
              <span role="img" aria-label="emoji">
                🏖
              </span>
            </div>
          </ToggleButton>
          <ToggleButton
            value="Culture"
            size="small"
            style={{ display: this.state.more ? "none" : "" }}
          >
            <div className="toggle-element">
              Culture{" "}
              <span role="img" aria-label="emoji">
                🎭
              </span>
            </div>
          </ToggleButton>
          <ToggleButton value="More" size="small">
            <div className="toggle-element">
              {this.state.more ? "Less" : "More"}
              <span role="img" aria-label="emoji">
                {this.state.more ? "⬅" : "➡"}
              </span>
            </div>
          </ToggleButton>

          <ToggleButton
            value="Ski"
            size="small"
            style={{ display: this.state.more ? "" : "none" }}
          >
            <div className="toggle-element">
              Skiing{" "}
              <span role="img" aria-label="emoji">
                ⛷
              </span>
            </div>
          </ToggleButton>
          <ToggleButton
            value="Nightlife"
            size="small"
            style={{ display: this.state.more ? "" : "none" }}
          >
            <div className="toggle-element">
              Nightlife{" "}
              <span role="img" aria-label="emoji">
                🌃
              </span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}
