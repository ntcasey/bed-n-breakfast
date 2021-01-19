import React from "react";
import star from "../../dist/svg/star.svg";
import SVG from "react-inlinesvg";

var PricePerNight = (props) => {
  return (
    <div>
      <div id="price-night-container">
        <div id="price">$199</div>
        <div id="per-night">per night</div>
      </div>
      <div id="star-review">
        <SVG id="star" src={star} />
        <div id="rating">4.90</div>
        <div id="review">(290 reviews)</div>
      </div>
    </div>
  );
};

export default PricePerNight;
