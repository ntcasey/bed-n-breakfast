import React from "react";
import rareFind from "../../dist/svg/rareFind.svg";
import attention from "../../dist/svg/attention.svg";
import SVG from "react-inlinesvg";

const ExtraInfo = (props) => {
  const displaySvg = (
    <SVG id="attention-svg" className="extraSVG" src={attention} />
  );
  if (props.status.startDate && props.status.endDate) {
    displaySvg = <SVG id="rareFind-svg" className="extraSVG" src={rareFind} />;
  }

  return (
    <div id="extra-info">
      <div id="not-charged">You won't be charged yet</div>
      {displaySvg}
    </div>
  );
};

export default ExtraInfo;
