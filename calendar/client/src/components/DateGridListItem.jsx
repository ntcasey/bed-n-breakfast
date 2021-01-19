import React from "react";

class DateGridListItem extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.firstGridColumn = this.firstGridColumn.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
  }

  prependZero(number) {
    if (number < 10) return "0" + number;
    else return number.toString();
  }

  hoverOver(dateTime, avalibility) {
    if (!avalibility) return;
    this.props.mouseEnter(dateTime);
  }

  clickHandler(dateTime, avalibility) {
    if (!avalibility) return;

    this.props.updateStartEndDate(dateTime);
  }

  firstGridColumn(day) {
    if (day === 1) {
      return (
        new Date(
          this.props.monthYear.year,
          this.props.monthYear.month - 1,
          this.props.day
        ).getDay() + 1
      );
    }
    return null;
  }

  //D8D8D8
  render() {
    const month = this.prependZero(this.props.monthYear.month);
    const day = this.prependZero(this.props.day);
    const dateTime = `${this.props.monthYear.year}-${month}-${day}`;

    const style = {};
    style["gridColumn"] = this.firstGridColumn(this.props.day);

    // starting day
    if (
      this.props.start_end.startingDay &&
      !this.props.monthYear.inSecondaryMonth
    ) {
      style["backgroundColor"] = "#00A699";
      style["color"] = "white";
    }

    // hovering
    if (this.props.hoverColor) {
      style["backgroundColor"] = "#A3F0EA";
      style["border"] = "solid #80E8E0 0.3px";
      style["color"] = "white";
    }

    if (this.props.hoverColor && this.props.existBothStartEnd) {
      style["backgroundColor"] = "#00A699";
      style["border"] = "0";
      style["color"] = "white";
    }

    if (!this.props.avalibility) {
      style["color"] = "#D8D8D8";
      style["textDecoration"] = "line-through";
      style["backgroundColor"] = "white";
    }

    return (
      <button
        style={style}
        onMouseEnter={() => {
          this.hoverOver(dateTime, this.props.avalibility);
        }}
        onClick={() => {
          this.clickHandler(dateTime, this.props.avalibility);
        }}
      >
        <time dateTime={dateTime}>{this.props.day}</time>
      </button>
    );
  }
}

export default DateGridListItem;
