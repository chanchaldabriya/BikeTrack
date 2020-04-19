import React from "react";
import "./List.css";
import ListItem from "../ListItem/ListItem";

function List({ records, loading=false, error=false }) {
  const errorText = "Oops, something went wrong",
    loadingText = "Loading...";

  const placeholderText = error ? (
    <span className="List-error">{errorText}</span>
  ) : (
    <span className="List-loading">{loadingText}</span>
  );

  return (
    <div className="List">
      {
      loading || error ? (
        <div className="List-placeholder">
          {placeholderText}
        </div>
      ) : (
        records.map((incident) => (
          <ListItem incident={incident} key={incident.id} />
        ))
      )}
    </div>
  );
}

export default List;
