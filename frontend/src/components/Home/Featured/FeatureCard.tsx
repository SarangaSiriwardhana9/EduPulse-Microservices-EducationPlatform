// FeatureCard.js
import React from "react";

function FeatureCard(props) {
  return (
    <div className="featureCard flex items-center">
      <div className="iconDiv flex items-center justify-center mr-4">
        {props.icon}
      </div>
      <div className="aboutDiv">
        <h4 className="text-lg font-semibold mb-1">{props.heading}</h4>
        <p className="text-sm">{props.para}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
