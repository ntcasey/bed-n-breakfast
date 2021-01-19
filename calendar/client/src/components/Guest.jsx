import React from "react";
import up from "../../dist/svg/up.svg";
import down from "../../dist/svg/down.svg";
import SVG from "react-inlinesvg";

class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }

  render() {
    let useSVG;
    const guestGrid = {};
    const guestText = {};
    const svgStyle = {};
    if (!this.state.clicked) {
      guestText["paddingLeft"] = "0em";
      guestText["backgroundColor"] = "white";
      guestText["color"] = "#484848";
      guestGrid["height"] = "35.99px";
      useSVG = down;
    } else {
      guestText["paddingLeft"] = "0.5em";
      guestText["backgroundColor"] = "#99EDE6";
      guestText["color"] = "#227A87";
      guestGrid["height"] = "45.99px";
      useSVG = up;
      svgStyle["paddingTop"] = "0.38em";
    }

    const showGreen = this.state.clicked ? (
      <div className="border-bottom"></div>
    ) : null;

    return (
      <div id="guest-container">
        <div className="guest-heading">Guest</div>
        <div
          id="guest"
          tabIndex="0"
          role="button"
          aria-pressed="false"
          onClick={this.clickHandler}
          style={guestGrid}
        >
          <div id="guest-1" style={guestText}>
            1 guest
          </div>
          <SVG style={svgStyle} className="svg-up-down" src={useSVG} />
          {/* <div className="border-bottom"></div>
                        <div className="border-bottom"></div> */}
        </div>
        {showGreen}
      </div>
    );
  }
}

export default Guest;
