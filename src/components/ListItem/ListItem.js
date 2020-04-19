import React from "react";
import "./ListItem.css";
import bikePlaceholder from "../../images/bicycle-solid.svg";

function ListItem({ incident }) {
  const { title, description, occurred_at, address, media } = incident;
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
          <span className="ListItem-date">
            {getDateString(occurred_at)}
          </span>
          {` - `}
          <span className="ListItem-location">{address}</span>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
