import React from "react";
import "./index.css";
function Maincard({ title, content }) {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title && title}</h2>
        <p className="card-body">{content && content}</p>
        <a href="#" className="button">
          Accept
        </a>
      </div>
    </div>
  );
}

export default Maincard;
