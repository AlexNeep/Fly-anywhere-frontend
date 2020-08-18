import React, { Component } from "react";

export default class BuyButton extends Component {
  generateUrl = () => {
    const baseURL = "https://www.skyscanner.net/";

    let extras =
      "?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&destinationentityid=27544008";
    let extra_extras =
      "&inboundaltsenabled=false&infants=0&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=0";
    let url = `${baseURL}transport/flights/${this.props.origin_code}/${this.props.destination_code}/${this.props.outbound}/${extras}${extra_extras}`;
    return url;
  };
  render() {
    return (
      <a href={this.generateUrl()} target="_blank" rel="noopener noreferrer">
        <button className="buy">Buy Now</button>
      </a>
    );
  }
}
