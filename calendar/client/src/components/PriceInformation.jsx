import React from "react";
import price from "../../dist/svg/price-info.svg";
import SVG from "react-inlinesvg";

var PriceInformation = (props) => {
  const bothStateExist = props.status.startDate && props.status.endDate;
  const displayPrice = !bothStateExist
    ? { display: "none" }
    : { display: null };

  return (
    <div id="price-info-container" style={displayPrice}>
      <SVG src={price} />
    </div>
  );
};

export default PriceInformation;
