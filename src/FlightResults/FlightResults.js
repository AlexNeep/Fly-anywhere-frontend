import React, { Component } from "react";

import FlightCard from "./FlightCard/FlightCard";
import Pagination from "./Pagination/Pagination";

import FlightResultsFilter from "./FlightResultsFilter";
import LoadingImage from "./LoadingImage";
import NoMatchingFlights from "./NoMatchingFlights";

import "./FlightResults.css";
class FlightResults extends Component {
  state = {
    perPage: 5,
    current_page: 1,
    total_pages: 0,
    holiday_type: "",
  };
  updateHolidayType = (data) => {
    this.setState(() => ({
      holiday_type: data,
    }));
  };
  setPage = (value) => {
    this.setState(() => ({
      current_page: value,
    }));
  };
  incrementPageByOne = () => {
    if (this.state.current_page < this.state.total_pages) {
      let new_page_value = this.state.current_page + 1;
      this.setPage(new_page_value);
    }
  };
  decrementPageByOne = () => {
    if (this.state.current_page > 1) {
      let new_page_value = this.state.current_page - 1;
      this.setPage(new_page_value);
    }
  };
  setTotalPages = (value = this.getTotalPages()) => {
    this.setState(() => ({
      total_pages: value,
    }));
  };

  getTotalPages = () => {
    let visible_flights = this.getVisibleFlights(this.props.flightData);
    let total_pages = visible_flights.length / this.state.perPage;
    return Math.ceil(total_pages);
  };
  setCurrentPage = (total_pages) => {
    if (total_pages > 0) {
      if (this.state.current_page > total_pages) {
        this.setState(() => ({
          current_page: total_pages,
        }));
      }
    }
  };
  getVisibleFlights = (flight_data) => {
    let visible_flights = this.getWithinBudgetFlights(flight_data.quotes);

    visible_flights = this.getMatchingHolidayTypeFlights(
      flight_data.locations,
      visible_flights,
      this.state.holiday_type
    );

    visible_flights = this.getDirectFlights(visible_flights);
    return visible_flights;
  };
  getCurrentPageVisibleFlights = (flight_data, PER_PAGE) => {
    let lower_bound = 0 + PER_PAGE * (this.state.current_page - 1);
    let upper_bound = PER_PAGE * this.state.current_page;

    let visible_flights = this.getVisibleFlights(flight_data);

    return visible_flights.slice(lower_bound, upper_bound);
  };
  getDirectFlights = (flights) => {
    return flights.filter((flight) => flight.direct === true);
  };
  getMatchingHolidayTypeFlights = (
    location_data,
    all_flights,
    holiday_type = this.state.holiday_type
  ) => {
    let visible_flights = [];
    if (holiday_type === "") {
      return all_flights;
    }
    all_flights.forEach((flight) => {
      location_data.forEach((location) => {
        if (location.id === flight.destination) {
          if (location.main_type === holiday_type && location.secondary_type) {
            visible_flights.push(flight);
          }
        }
      });
    });

    return visible_flights;
  };

  getWithinBudgetFlights = (flight_data, budget = this.props.budget) => {
    return flight_data.filter((flight) => flight.price < budget);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.budget !== this.props.budget) {
      this.setTotalPages();
      this.setCurrentPage();
    }
    if (
      this.getWithinBudgetFlights(prevProps.flightData.quotes, prevProps.budget)
        .length !==
      this.getWithinBudgetFlights(this.props.flightData.quotes).length
    ) {
      let total_pages = this.getTotalPages();
      this.setTotalPages(total_pages);
      this.setCurrentPage(total_pages);
    }
    if (prevState.holiday_type !== this.state.holiday_type) {
      let total_pages = this.getTotalPages();
      this.setTotalPages(total_pages);
      this.setCurrentPage(total_pages);
    }
  };

  render() {
    let visible_flights = this.getCurrentPageVisibleFlights(
      this.props.flightData,
      this.state.perPage
    );

    return (
      <div className="flight-results">
        <FlightResultsFilter
          request={this.props.request}
          holiday_type={this.state.holiday_type}
          updateHolidayType={this.updateHolidayType}
        />

        {visible_flights.map((flight, index) => (
          <FlightCard
            key={index}
            flight={flight}
            locations={this.props.flightData.locations}
            carriers={this.props.flightData.carriers}
            currency={this.props.currency}
            outbound={this.props.outbound}
          />
        ))}

        <LoadingImage request={this.props.request} />

        <NoMatchingFlights
          visible_flights={visible_flights}
          request={this.props.request}
        />

        <Pagination
          decrementPageByOne={this.decrementPageByOne}
          incrementPageByOne={this.incrementPageByOne}
          setPage={this.setPage}
          current_page={this.state.current_page}
          total_pages={this.state.total_pages}
        />
      </div>
    );
  }
}
export default FlightResults;
