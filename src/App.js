import React, { Component } from "react";
import "./App.css";

import Nav from "./Navbar/Nav";
import FlightResults from "./FlightResults/FlightResults";
import Footer from "./Footer/Footer";

import DataSelectionColumn from "./DataSelectionColumn/DataSelectionColumn";

class App extends Component {
  state = {
    baseURL: "http://127.0.0.1:8000",
    flights: [
      {
        quotes: [],
        locations: [],
        carriers: [],
      },
    ],
    holiday_types: [],
    request: {
      origin: "",
      outbound: "",
      inbound: "",
    },
    origin: "London Stansted",
    code: "STN-sky",
    destination: "DE-sky",
    region: "Carribean",
    outbound: "2020-09-01",
    inbound: "2020-12-01",
    trip_duration: "7",
    currency: "GBP",
    budget: "200",
    country: "DE",
    locale: "en-US",
    holiday_type: "Beach",
  };

  componentDidMount() {
    this.apiGetHolidayTypes().then((types) => {
      this.setState(() => ({
        holiday_types: types,
      }));
    });
  }

  apiGetHolidayTypes = async () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.state.baseURL}/getCityTypes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getHolidayType = (city) => {
    let holiday_types = this.state.holiday_types;
    for (let index = 0; index < holiday_types.length; index++) {
      if (holiday_types[index].city === city) {
        return [
          holiday_types[index].main_type,
          holiday_types[index].secondary_type,
        ];
      }
    }
    return ["None", "None"];
  };

  updateFlights = (data) => {
    this.setState(() => ({ flights: data }));
  };
  updateOrigin = (name, code = name) => {
    this.setState(() => ({
      origin: name,
      code: code,
    }));
  };
  updateBudget = (data) => {
    if (parseInt(data) === 501) {
      data = 10000;
    }
    this.setState(() => ({
      budget: data,
    }));
  };
  updateOutbound = (data) => {
    this.setState(() => ({
      outbound: data,
    }));
  };

  updateTrip_duration = (data) => {
    this.setState(() => ({
      trip_duration: data,
    }));
  };
  updateFlightTime = (data) => {
    this.setState(() => ({
      flighttime: data,
    }));
  };
  updateFlights = (quotes, locations, carriers) => {
    quotes.sort((a, b) => {
      return a.price - b.price;
    });

    this.setState(() => ({
      flights: [
        {
          quotes: quotes,
          locations: locations,
          carriers: carriers,
        },
      ],
    }));
  };

  updateLastRequest = () => {
    this.setState(() => ({
      request: {
        origin: this.state.origin,
        outbound: this.state.outbound,
        inbound: this.state.inbound,
      },
    }));
  };
  getFlightData = async (destination) => {
    return new Promise((resolve, reject) => {
      fetch(`${this.state.baseURL}/getFlightData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            outbound_date: this.state.outbound,
            inbound_date: this.state.inbound,
            origin: this.state.code,
            destination: destination,
            country: this.state.country,
            currency: this.state.currency,
            locale: this.state.locale,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  findFlights = () => {
    const destination = "anywhere";

    this.getFlightData(destination)
      .then((result) => this.renderFlights(result))
      .catch((error) => {
        console.log("error", error);
      });
  };

  renderFlights = (flight_data) => {
    console.log("data", flight_data);
    this.updateLastRequest();
    let formated_quotes = this.formatQuotes(flight_data.Quotes);
    let formated_locations = this.formatLocations(flight_data.Places);
    let formated_carriers = this.formatCarriers(flight_data.Carriers);
    this.updateFlights(formated_quotes, formated_locations, formated_carriers);
  };

  formatQuotes = (data) => {
    let formated_quotes = [];
    for (let i = 0; i < data.length; i++) {
      let current_quote = data[i];

      let temp = [];
      temp["id"] = current_quote.QuoteId;
      temp["origin"] = current_quote.OutboundLeg.OriginId;
      temp["destination"] = current_quote.OutboundLeg.DestinationId;

      temp["carrier"] = current_quote.OutboundLeg.CarrierIds[0];
      temp["price"] = current_quote.MinPrice;
      temp["direct"] = current_quote.Direct;

      formated_quotes.push(temp);
    }
    return formated_quotes;
  };
  formatLocations = (data) => {
    let formated_locations = [];

    for (let i = 0; i < data.length; i++) {
      let current_location = data[i];
      if (current_location.CityName !== undefined) {
        let temp = [];

        temp["id"] = current_location.PlaceId;
        temp["name"] = current_location.CityName;
        temp["code"] = current_location.IataCode;
        temp["country"] = current_location.CountryName;

        let holiday_types = this.getHolidayType(temp["name"]);
        temp["main_type"] = holiday_types[0];
        temp["secondary_type"] = holiday_types[1];
        formated_locations.push(temp);
      }
    }
    return formated_locations;
  };
  formatCarriers = (data) => {
    let formated_carriers = [];

    for (let i = 0; i < data.length; i++) {
      let current_carrier = data[i];

      let temp = [];

      let carrier_id = current_carrier.CarrierId;
      let carrier_name = current_carrier.Name;

      temp["id"] = carrier_id;
      temp["name"] = carrier_name;
      formated_carriers.push(temp);
    }
    return formated_carriers;
  };

  render() {
    return (
      <div className="app">
        <Nav />

        <div className="row">
          <DataSelectionColumn
            origin={this.state.origin}
            code={this.state.code}
            outbound={this.state.outbound}
            trip_duration={this.state.trip_duration}
            budget={this.state.budget}
            holiday_type={this.state.holiday_type}
            updateOrigin={this.updateOrigin}
            updateOutbound={this.updateOutbound}
            updateTrip_duration={this.updateTrip_duration}
            updateBudget={this.updateBudget}
            findFlights={this.findFlights}
            updateHolidayType={this.updateHolidayType}
          />

          <div className="results-col">
            <FlightResults
              request={this.state.request}
              outbound={this.state.outbound}
              flightData={this.state.flights[0]}
              currency={this.state.currency}
              budget={this.state.budget}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
