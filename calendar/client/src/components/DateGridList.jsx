import React from "react";
import DateGridListItem from "./DateGridListItem.jsx";

var DateGridList = (props) => {
  const hoverDates = props.listOfColorDates;

  return (
    <div className="date-grid">
      {props.days.map((number) => {
        var startingDay, endingDay;
        if (props.monthYear.startDate) {
          var start_Day = props.monthYear.startDate.slice(-2);
          startingDay = Number(start_Day) === number;
        }

        if (props.monthYear.endDate) {
          const end_Day = props.monthYear.endDate.slice(-2);
          endingDay = Number(end_Day) === number;
        }

        const start_end = {
          startingDay: startingDay,
          endingDay: endingDay,
        };

        const existBothStartEnd =
          props.monthYear.startDate && props.monthYear.endDate;

        const hoverColor = hoverDates.indexOf(number) !== -1;

        return (
          <DateGridListItem
            key={number.toString()}
            day={number}
            avalibility={props.avalibility[number]}
            hoverColor={hoverColor}
            start_end={start_end}
            existBothStartEnd={existBothStartEnd}
            monthYear={props.monthYear}
            updateStartEndDate={props.updateStartEndDate}
            mouseEnter={props.mouseEnter}
          />
        );
      })}
    </div>
  );
};

export default DateGridList;
