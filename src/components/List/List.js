import React from "react";
import "./List.css";
import ListItem from "../ListItem/ListItem";

function List({ items }) {
  return (
    <div className="List">
      {items.map((incident) => (
        <ListItem incident={incident} key={incident.id} />
      ))}
    </div>
  );
}

export default List;
