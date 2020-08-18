import React, { Component } from "react";

import "./Pagination.css";
import PageSlider from "@material-ui/lab/Pagination";

export default class Pagination extends Component {
  render() {
    return (
      <div
        className="page-navigation"
        style={{
          display: this.props.total_pages > 1 ? "block" : "none",
        }}
      >
        <div className="page-count highlight">
          <PageSlider
            count={this.props.total_pages}
            page={this.props.current_page}
            onChange={(event, value) => this.props.setPage(value)}
            color="primary"
            size="small"
            siblingCount={0}
          />
        </div>
      </div>
    );
  }
}
