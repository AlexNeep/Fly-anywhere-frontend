import React, { Component } from "react";

import FlightInfo from "./FlightInfo/FlightInfo";
import Types from "./Types/Types";
import BuyButton from "./BuyButton";

import "./FlightCard.css";

class FlightCard extends Component {
  decodeCurrency = (currency) => {
    if (currency === "GBP") {
      return "£";
    } else {
      return "";
    }
  };

  decodeId = (needle_id, array, object_path) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === needle_id) {
        return array[i][object_path];
      }
    }
    return "unknown";
  };
  formatDate = (date) => {
    const d = new Date(date);
    const year = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(d);
    const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return year + month + day;
  };
  render() {
    return (
      <div key={this.props.id} className="flight-card">
        <div className="destination-row">
          <FlightInfo
            origin={this.decodeId(
              this.props.flight.origin,
              this.props.locations,
              "name"
            )}
            destination={this.decodeId(
              this.props.flight.destination,
              this.props.locations,
              "name"
            )}
            country={this.decodeId(
              this.props.flight.destination,
              this.props.locations,
              "country"
            )}
            carrier={this.decodeId(
              this.props.flight.carrier,
              this.props.carriers,
              "name"
            )}
          />
          <Types flight={this.props.flight} locations={this.props.locations} />
        </div>
        <div className="price-row">
          <div className="price">
            {this.decodeCurrency(this.props.currency)} {this.props.flight.price}
          </div>

          <div>
            <BuyButton
              origin_code={this.decodeId(
                this.props.flight.origin,
                this.props.locations,
                "code"
              )}
              destination_code={this.decodeId(
                this.props.flight.destination,
                this.props.locations,
                "code"
              )}
              outbound={this.formatDate(this.props.outbound)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default FlightCard;
