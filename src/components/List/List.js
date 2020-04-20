import React from "react";
import "./List.css";
import ListItem from "../ListItem/ListItem";

function List({ records=[], loading=false, error=false }) {
  const errorText = "Oops, something went wrong",
    loadingText = "Loading...",
    emptyText = "No results",
    isEmpty = records.length === 0;

  const placeholderText = () => {
    if(error)
      return <span className="List-error">{errorText}</span>;
    if(loading)
      return <span className="List-loading">{loadingText}</span>;
    if(isEmpty)
      return <span className="List-empty">{emptyText}</span>;
  }

  return (
    <div className="List">
      {
      loading || error || isEmpty ? (
        <div className="List-placeholder">
          {placeholderText()}
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
