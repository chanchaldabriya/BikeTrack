import React, { Component } from "react";
import "./BikeTrack.css";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";

const INCIDENTS_URL = "https://bikewise.org:443/api/v2/incidents",
  QUERY_PARAMETERS = {
    PAGE: "page",
    PER_PAGE: "per_page",
    INCIDENT_TYPE: "incident_type",
    PROXIMITY: "proximity",
  };

const recordsPerPage = 10,
  incidentType = "theft",
  proximity = "delhi",
  title = "Delhi Police Department",
  subtitle = "Stolen Bikes";

class BikeTrack extends Component {
  state = {
    page: 1,
    incidents: [],
    total: 0,
    loading: false,
    allRecordsLoaded: false
  };

  componentDidMount() {
    this.getCurrentPageIncidents();

    this.getTotalIncidents();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.page !== this.state.page) {
      this.getCurrentPageIncidents();
    }
  }

  getTotalIncidents = () => {
    const url = `${INCIDENTS_URL}?${QUERY_PARAMETERS.INCIDENT_TYPE}=${incidentType}&${QUERY_PARAMETERS.PROXIMITY}=${proximity}`;
    fetch(url)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          total: response.incidents.length,
          allRecordsLoaded: true
        });
      });
  };

  getCurrentPageIncidents = () => {
    this.setState({
      loading: true
    });

    const url = `${INCIDENTS_URL}?${QUERY_PARAMETERS.PAGE}=${this.state.page}&${QUERY_PARAMETERS.PER_PAGE}=${recordsPerPage}&${QUERY_PARAMETERS.INCIDENT_TYPE}=${incidentType}&${QUERY_PARAMETERS.PROXIMITY}=${proximity}`;

    fetch(url)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          incidents: response.incidents,
          loading: false
        });
      })
      .catch(error => {

      });
  };

  setPage = (page) => {
    let newPage;
    switch (page) {
      case "next":
        newPage = this.state.page + 1;
        break;

      case "prev":
        newPage = this.state.page - 1;
        break;

      default:
        newPage = parseInt(page);
    }
    this.setState({
      page: newPage,
    });
  };

  render() {
    return (
      <div className="BikeTrack">
        <Header title={title} subtitle={subtitle} />

        {/* Incident List */}
        <List items={this.state.incidents} loading={this.state.loading} />

        <Pagination
          currentPage={this.state.page}
          total={this.state.total}
          perPage={recordsPerPage}
          setPage={this.setPage}
          loading={!this.state.allRecordsLoaded}
        />
      </div>
    );
  }
}

export default BikeTrack;
