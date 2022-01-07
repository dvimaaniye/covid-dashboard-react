import React from "react";
import "./InfoCard.scss";
const InfoCard = ({ title, number, bg = "default", fg = "default" }) => {
  switch (bg) {
    case "default":
      bg = "#EEF2F7";
      fg = "#1F3F47";
      break;
    case "green":
      bg = "#00e57d";
      fg = "#e7fef3";
      break;
    case "red":
      bg = "#ed2121";
      fg = "#FDE7E7";
      break;
    case "blue":
      bg = "#597bff";
      fg = "#e5ebff";
      break;
    default:
      break;
  }
  return (
    <div className="infocard" style={{ backgroundColor: bg, color: fg }}>
      <h2 className="infocard__title">{title}</h2>
      <h3 className="infocard__number">{number}</h3>
    </div>
  );
};

export default InfoCard;
