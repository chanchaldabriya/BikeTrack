import React, { Component } from "react";
import "./BikeTrack.css";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";

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
    current: {
      page: 1,
      loading: false,
      error: false,
      records: [],
    },
    all: {
      loading: false,
      error: false,
      records: [],
    },
    filter: {
      query: "",
    },
  };

  componentDidMount() {
    this.getCurrentPageIncidents();

    this.getTotalIncidents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.current.page !== this.state.current.page ||
      prevState.filter.query !== this.state.filter.query
    ) {
      this.getCurrentPageIncidents();
    }
  }

  setFilterQuery = (query) => {
    this.setState({
      filter: {
        ...this.state.filter,
        query: encodeURI(query),
      },
    });
  };

  getTotalIncidents = () => {
    debugger;
    this.setState({
      all: {
        ...this.state.all,
        loading: true,
      },
    });

    const url = `${INCIDENTS_URL}?${QUERY_PARAMETERS.INCIDENT_TYPE}=${incidentType}&${QUERY_PARAMETERS.PROXIMITY}=${proximity}`;
    fetch(url)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          all: {
            ...this.state.all,
            records: response.incidents.length,
            loading: false,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          all: {
            ...this.state.all,
            records: [],
            loading: false,
            error: true,
          },
        });
      });
  };

  getCurrentPageIncidents = () => {
    debugger;
    this.setState({
      current: {
        ...this.state.current,
        loading: true,
      },
    });

    let url = `${INCIDENTS_URL}?${QUERY_PARAMETERS.PAGE}=${this.state.current.page}&${QUERY_PARAMETERS.PER_PAGE}=${recordsPerPage}&${QUERY_PARAMETERS.INCIDENT_TYPE}=${incidentType}&${QUERY_PARAMETERS.PROXIMITY}=${proximity}`;

    if (this.state.filter.query) url += `&query=${this.state.filter.query}`;

    fetch(url)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          current: {
            ...this.state.current,
            records: response.incidents,
            loading: false,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          current: {
            ...this.state.current,
            records: [],
            loading: false,
            error: true,
          },
        });
      });
  };

  setPage = (page) => {
    let newPage;
    switch (page) {
      case "next":
        newPage = this.state.current.page + 1;
        break;

      case "prev":
        newPage = this.state.current.page - 1;
        break;

      default:
        newPage = parseInt(page);
    }
    this.setState({
      current: {
        ...this.state.current,
        page: newPage,
      },
    });
  };

  render() {
    return (
      <div className="BikeTrack">
        <Header title={title} subtitle={subtitle} />

        <Filter setFilterQuery={this.setFilterQuery} />

        {/* Incident List */}
        <List {...this.state.current} />

        <Pagination
          currentPage={this.state.current.page}
          perPage={recordsPerPage}
          setPage={this.setPage}
          {...this.state.all}
        />
      </div>
    );
  }
}

export default BikeTrack;
