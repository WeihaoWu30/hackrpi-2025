// Components/InfoCard.js
import React from "react";
import "./components.css";

// InfoCard component
const InfoCard = ({ icon, title, children }) => {
  return (
    <section className="info-card">
      <h2>
        <i className={`fa-solid fa-${icon}`}></i> {title}
      </h2>
      <div className="info-content">{children}</div>
    </section>
  );
};

export default InfoCard;