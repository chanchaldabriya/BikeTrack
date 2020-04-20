import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ setFilterQuery }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="Filter">
      <input
        placeholder="Search case descriptions"
        className="Filter-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button className="Filter-submit" onClick={() => setFilterQuery(query)}>Find Cases</button>
    </div>
  );
};

export default Filter;
