import React from "react";
import "./List.css";
import ListItem from "../ListItem/ListItem";

function List({ items, loading = false }) {
  const loadingText = "Loading...";

  return (
    <div className="List">
      {
        loading ? (
          <div className="List-loading">
            <span>{loadingText}</span>
          </div>
        ) : 
        items.map((incident) => (
          <ListItem incident={incident} key={incident.id} />
        ))  
      }
    </div>
  );
}

export default List;
