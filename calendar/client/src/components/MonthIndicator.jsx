import React from "react";
import left from "../../dist/svg/left.svg";
import right from "../../dist/svg/right.svg";
import SVG from "react-inlinesvg";

class MonthIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mousePrev: false,
      mouseNext: false,
    };
    this.mousePrev = this.mousePrev.bind(this);
    this.mouseNext = this.mouseNext.bind(this);
  }

  updating(typeMonth) {
    this.props.updateDateMonth(typeMonth);
  }

  mousePrev() {
    this.setState({
      mousePrev: !this.state.mousePrev,
    });
  }

  mouseNext() {
    this.setState({
      mouseNext: !this.state.mouseNext,
    });
  }

  styling(mouseState) {
    if (mouseState) {
      return { borderColor: "#C4C4C4" };
    } else {
      return { borderColor: "#E4E7E7" };
    }
  }

  render() {
    const stylePrev = this.styling(this.state.mousePrev);
    const styleRight = this.styling(this.state.mouseNext);
    return (
      <div id="month-container">
        <div className="month-indicator">
          <SVG
            id="prev-button"
            className="transition svg"
            src={left}
            style={stylePrev}
            onMouseEnter={this.mousePrev}
            onMouseLeave={this.mousePrev}
            onClick={() => {
              this.updating("prevMonth");
            }}
          />
          <time>
            {this.props.month} {this.props.year}
          </time>
          <SVG
            id="next-button"
            className="transition svg"
            src={right}
            style={styleRight}
            onMouseEnter={this.mouseNext}
            onMouseLeave={this.mouseNext}
            onClick={() => {
              this.updating("nextMonth");
            }}
          />
        </div>
      </div>
    );
  }
}

export default MonthIndicator;
