import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ setFilter }) => {
  const [query, setQuery] = useState(""),
    [rangeStart, setRangeStart] = useState(""),
    [rangeEnd, setRangeEnd] = useState("");

  const onDateChange = (event) => {
    const { name, value } = event.target;

    // set dateSetter method acc to name
    let setDate;
    switch (name) {
      case "rangeStart":
        setDate = setRangeStart;
        break;

      case "rangeEnd":
        setDate = setRangeEnd;
        break;
    }

    setDate(value);
  };

  const dateField = (label, name) => {
    return (
      <div className="Filter-date">
        <label className="Filter-date-label">{label + ": "}</label>
        <input
          className="Filter-date-input"
          type="date"
          name={name}
          onChange={onDateChange}
          value={name === "rangeStart" ? rangeStart : rangeEnd}
        />
        <span className="Filter-date-btn">
          <button>📅</button>
        </span>
      </div>
    );
  };

  return (
    <div className="Filter">
      <div className="Filter-inner">
        <input
          placeholder="Search case descriptions"
          className="Filter-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="Filter-date-range">
          {dateField("Start Date", "rangeStart")}
          {dateField("End Date", "rangeEnd")}
        </div>
      </div>
      <button
        className="Filter-submit"
        onClick={() => setFilter(query, rangeStart, rangeEnd)}
      >
        Find Cases
      </button>
    </div>
  );
};

export default Filter;
