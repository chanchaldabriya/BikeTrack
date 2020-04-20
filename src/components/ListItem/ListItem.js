import React from "react";
import "./ListItem.css";
import bikePlaceholder from "../../images/bicycle-solid.svg";

function ListItem({ incident }) {
  const { title, description, occurred_at, updated_at, address, media } = incident;
  const hasImage = media["image_url_thumb"],
    placeholderClass = !hasImage ? " img-placeholder" : "";

  const getDateString = (dateMillis) => {
    const date = new Date(parseInt(dateMillis + "000"));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
    

  return (
    <div className="ListItem">
      <div className="ListItem-image-container">
        <img
          src={hasImage || bikePlaceholder}
          alt="Bike"
          className={"ListItem-image" + placeholderClass}
        />
      </div>
      <div className="ListItem-details">
        {title && <h2 className="ListItem-title">{title}</h2>}

        {description && <p className="ListItem-description">{description}</p>}

        <div className="ListItem-timestamp">
          <div className="ListItem-stolen">
            <span className="ListItem-stolen-label">Stolen: </span>
            <span>{getDateString(occurred_at)}</span>
          </div>

          <div className="ListItem-reported">
            <span className="ListItem-reported-label">Reported: </span>
            <span>{getDateString(updated_at)}</span>
          </div>

          <div className="ListItem-location">
            <span className="ListItem-location-label">Location: </span>
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
