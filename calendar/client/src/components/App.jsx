import React, { Component } from "react";
import axios from "axios";
import MonthIndicator from "./MonthIndicator.jsx";
import DayOfWeek from "./DayOfWeek.jsx";
import DateGridList from "./DateGridList.jsx";
import ClearDate from "./ClearDate.jsx";
import CheckInOut from "./CheckInOut.jsx";
import PricePerNight from "./PricePerNight.jsx";
import Guest from "./Guest.jsx";
import PriceInformation from "./PriceInformation.jsx";
import ExtraInfo from "./ExtraInfo.jsx";
import "./styles/style.css";

class App extends Component {
  /*  0 index */
  /* returns the month given an index number */
  static monthConversion(index) {
    const m = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return m[index];
  }

  static daysArray(low, end) {
    const list = [];
    for (let i = low; i <= end; i++) list.push(i);

    return list;
  }

  /* returns number of days given a month and year number */
  static getDaysInMonth(month, year) {
    // month from 1-12;
    return new Date(year, month, 0).getDate();
  }

  static stringMonthZeroPad(month) {
    let monthStr;
    if (month < 10) {
      monthStr = "0" + month;
    } else {
      monthStr = month.toString;
    }
    return monthStr;
  }

  constructor(props) {
    super(props);

    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const month = App.monthConversion(date.getMonth());
    const year = date.getFullYear();

    this.state = {
      monthNumber, // 1-12
      month, // full string name
      year,
      days: App.daysArray(1, App.getDaysInMonth(monthNumber, year)), // array of days in current month

      // hover/start/end date represented in [year-month-day] "2020-01-22"
      hoverDate: "",
      startDate: "",
      endDate: "",

      // secondary start/end date
      secondaryStartDate: "",
      secondaryEndDate: "",
      inSecondaryMonth: false,

      // a dates of days that are avalible and not avalible in a given month
      // ex: [{1: T}, {2: F}, ... {31: T}]
      avalibility: [],
      reveal: false,
    };

    this.buttonCLick = this.buttonCLick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.updateDateMonth = this.updateDateMonth.bind(this);
    this.clearState = this.clearState.bind(this);
    this.revealCalendar = this.revealCalendar.bind(this);
  }

  componentDidMount() {
    //const baseURL = "http://3.16.164.208";
    const baseURL = "localhost";
    axios
      .get(`http://${baseURL}:3001/month`, {
        params: {
          id: 1,
          month: "02",
          year: this.state.year,
        },
      })
      .then((response) => {
        let unavaliable_Dates = response.data;
        let unavalible_Days = [];
        unavaliable_Dates.forEach((date) => {
          let _day = Number(date.substring(8));
          unavalible_Days.push(_day);
        });

        let avalibility = {};
        this.state.days.forEach((day) => {
          if (unavalible_Days.indexOf(day) !== -1) {
            avalibility[day] = false;
          } else {
            avalibility[day] = true;
          }
        });
        this.setState({
          avalibility,
        });
      })
      .catch((err) => {
        console.log("Unable to retrieve availability from DB");
        console.log("Making all dates available");
        let avalibility = {};
        this.state.days.forEach((day) => {
          avalibility[day] = true;
        });
        this.setState({
          avalibility,
        });
      });
  }

  /* updates view of calendar when user clicks next/prev button */
  updateDateMonth(typeMonth) {
    let updatedMonth;
    let _m, _y;
    if (typeMonth === "nextMonth") {
      if (this.state.monthNumber === 12) {
        _m = 1;
        _y = this.state.year + 1;
      } else {
        _m = this.state.monthNumber + 1;
        _y = this.state.year;
      }
      updatedMonth = App.stringMonthZeroPad(_m);
    } else {
      if (this.state.monthNumber === 1) {
        _m = 12;
        _y = this.state.year - 1;
      } else {
        _m = this.state.monthNumber - 1;
        _y = this.state.year;
      }
      updatedMonth = App.stringMonthZeroPad(_m);
    }

    //const baseURL = "http://3.16.164.208:3001/month";
    const baseURL = "localhost";
    axios
      .get(`http://${baseURL}:3001/month`, {
        params: {
          id: 1,
          month: updatedMonth,
          year: _y,
        },
      })
      .then((response) => {
        let unavaliable_Dates = response.data;
        let unavalible_Days = [];
        unavaliable_Dates.forEach((date) => {
          let _day = Number(date.substring(8));
          unavalible_Days.push(_day);
        });

        let avalibility = {};
        App.daysArray(1, App.getDaysInMonth(_m, _y)).forEach((day) => {
          if (unavalible_Days.indexOf(day) !== -1) {
            avalibility[day] = false;
          } else {
            avalibility[day] = true;
          }
        });

        console.log(avalibility);

        let y, m;
        let secondaryStartDate;
        if (this.state.secondaryStartDate) {
          secondaryStartDate = this.state.secondaryStartDate;
        }

        // next month
        if (typeMonth === "nextMonth") {
          if (this.state.monthNumber === 12) {
            y = this.state.year + 1;
            m = 1;
          } else {
            y = this.state.year;
            m = this.state.monthNumber + 1;
          }

          // secondaryStartDate
          if (!this.state.secondaryStartDate) {
            if (this.state.startDate && !this.state.secondaryStartDate) {
              secondaryStartDate = new Date(y, m - 1, 1)
                .toISOString()
                .split("T")[0];
            }
          } else {
            secondaryStartDate = this.state.secondaryStartDate;
          }
        } else {
          if (this.state.monthNumber === 1) {
            y = this.state.year - 1;
            m = 12;
          } else {
            y = this.state.year;
            m = this.state.monthNumber - 1;
          }
        }

        var date = new Date(y, m - 1, 1); // note: zero index
        var monthNumber = date.getMonth() + 1;
        var month = App.monthConversion(date.getMonth());
        var year = date.getFullYear();

        this.setState({
          avalibility,
          monthNumber,
          month,
          year,
          days: App.daysArray(1, App.getDaysInMonth(monthNumber, year)),

          secondaryStartDate,
          hoverDate: "",
        });
      })
      .catch((error) => {
        console.log("Unable to retrieve availability from DB");
        console.log("Making all dates available");
        let avalibility = {};
        App.daysArray(1, App.getDaysInMonth(_m, _y)).forEach((day) => {
          avalibility[day] = true;
        });

        // update new month
        let y, m;
        let secondaryStartDate;
        if (this.state.secondaryStartDate) {
          secondaryStartDate = this.state.secondaryStartDate;
        }

        // next month
        if (typeMonth === "nextMonth") {
          if (this.state.monthNumber === 12) {
            y = this.state.year + 1;
            m = 1;
          } else {
            y = this.state.year;
            m = this.state.monthNumber + 1;
          }

          // secondaryStartDate
          if (!this.state.secondaryStartDate) {
            if (this.state.startDate && !this.state.secondaryStartDate) {
              secondaryStartDate = new Date(y, m - 1, 1)
                .toISOString()
                .split("T")[0];
            }
          } else {
            secondaryStartDate = this.state.secondaryStartDate;
          }
        } else {
          // prev month
          if (this.state.monthNumber === 1) {
            y = this.state.year - 1;
            m = 12;
          } else {
            y = this.state.year;
            m = this.state.monthNumber - 1;
          }
        }

        const date = new Date(y, m - 1, 1); // note: zero index
        const monthNumber = date.getMonth() + 1;
        const month = App.monthConversion(date.getMonth());
        const year = date.getFullYear();

        this.setState({
          avalibility: avalibility,
          monthNumber,
          month,
          year,
          days: App.daysArray(1, App.getDaysInMonth(monthNumber, year)),

          secondaryStartDate,
          hoverDate: "",
        });
      });
  }

  /* clears start and end date */
  clearState() {
    this.setState({
      hoverDate: "",
      startDate: "",
      endDate: "",
      secondaryStartDate: "",
      secondaryEndDate: "",

      inSecondaryMonth: false,
    });
  }

  // date parameter in [yyyy-mm-dd]
  getMonth(date) {
    return date.substring(5, 7);
  }

  // date parameter in [yyyy-mm-dd]
  getYear(date) {
    return date.substring(0, 4);
  }

  /* sets startDate or endDate depending on button click */
  buttonCLick(dateTime) {
    //var secondaryStartDate;
    let secondaryEndDate = "";
    let date;
    if (!this.state.startDate) {
      date = "startDate";

      this.setState({
        // hoverDate: '',
        [date]: dateTime,
        secondaryEndDate: secondaryEndDate,
      });
    } else if (!this.state.endDate) {
      date = "endDate";

      if (this.getMonth(dateTime) !== this.getMonth(this.state.startDate)) {
        let m = Number(this.getMonth(this.state.startDate));
        let y = Number(this.getYear(this.state.startDate));
        let temp = new Date(y, m - 1, App.getDaysInMonth(m, y));
        secondaryEndDate = temp.toISOString().split("T")[0];
      }

      this.setState({
        // hoverDate: '',
        [date]: dateTime,
        secondaryEndDate: secondaryEndDate,

        // come back here if error
        reveal: false,
      });
    } else {
      return;
    }
  }

  /* sets state [hovereDate] for specific days that are hovered */
  mouseEnter(dateTime) {
    let currentStartDate = this.state.startDate;
    if (this.state.secondaryStartDate) {
      currentStartDate = this.state.secondaryStartDate;
    }

    let firstDay = Number(currentStartDate.slice(-2));
    let hoverDay = Number(dateTime.slice(-2));

    if (currentStartDate && this.state.endDate) {
      return;
    }
    // might have to come back here...
    if (currentStartDate && hoverDay >= firstDay) {
      this.setState({
        hoverDate: dateTime,
      });
    }
  }

  /* helper function for colorDates() */
  /* returns an array between and including two numbers */
  listBetweenTwoNumbers(low, end) {
    const list = [];
    for (var i = low; i <= end; i++) list.push(i);

    return list;
  }

  // date parameter in [yyyy-mm-dd], return T/F if date in current month
  inCurrentMonth(date) {
    return this.state.monthNumber === Number(this.getMonth(date));
  }

  /* returns an array of days that need to be colored [hover] */
  colorDates() {
    let firstDay;
    if (this.state.startDate) {
      if (this.inCurrentMonth(this.state.startDate)) {
        firstDay = Number(this.state.startDate.slice(-2));
      }

      if (this.state.secondaryStartDate) {
        if (this.inCurrentMonth(this.state.secondaryStartDate)) {
          firstDay = Number(this.state.secondaryStartDate.slice(-2)) - 1;
        }
      }
      let endDay;
      if (this.state.endDate) {
        if (
          this.state.monthNumber === Number(this.getMonth(this.state.endDate))
        ) {
          endDay = Number(this.state.endDate.slice(-2));
        }
        if (
          this.state.monthNumber ===
          Number(this.getMonth(this.state.secondaryEndDate))
        ) {
          endDay = Number(this.state.secondaryEndDate.slice(-2));
        }
      } else {
        endDay = Number(this.state.hoverDate.slice(-2));
      }
      return this.listBetweenTwoNumbers(firstDay + 1, endDay);
    }
    return [];
  }

  updateCurrentParams() {
    const obj = {
      month: this.state.monthNumber,
      year: this.state.year,
    };

    obj["startDate"] = "";
    if (this.inCurrentMonth(this.state.startDate))
      obj["startDate"] = this.state.startDate;

    let secondaryStartDate = this.state.secondaryStartDate;
    if (secondaryStartDate) {
      if (
        this.state.monthNumber === Number(this.getMonth(secondaryStartDate))
      ) {
        obj["startDate"] = secondaryStartDate;
        //
        obj["inSecondaryMonth"] = true;
      } else if (
        this.state.monthNumber === Number(this.getMonth(this.state.startDate))
      ) {
        obj["startDate"] = this.state.startDate;
      } else {
        //comeback
        obj["startDate"] = "";
      }
    }

    // let secondaryEndDate = this.state.secondaryEndDate;
    // if(secondaryEndDate)

    if (this.state.endDate) {
      if (
        this.state.monthNumber === Number(this.getMonth(this.state.startDate))
      ) {
        obj["endDate"] = this.state.secondaryEndDate;
      }

      if (
        this.state.monthNumber === Number(this.getMonth(this.state.endDate))
      ) {
        obj["endDate"] = this.state.endDate;
      }
    }

    return obj;
  }

  revealCalendar() {
    this.setState({
      reveal: true,
    });
  }

  // ===== cccc ====
  // make date from monthNumber year
  //
  makeDateFrMonthYear(monthNumber, year) {
    // the date return will be <yyyy-mm-01>
    const dateStr = year.toString() + "/" + monthNumber.toString() + "/01";
    const date = new Date(dateStr);
    return date;
  }

  makeDateFrDateStrMonth(DateStr) {
    // string yyyy-mm-dd
    //        012345678
    // return date with yy-mm-01 for month compare

    let startDate0M = DateStr.slice(5, 7);
    let startDate0Y = DateStr.slice(0, 4);

    let Date0Month = this.makeDateFrMonthYear(startDate0M, startDate0Y);

    return Date0Month;
  }
  // ===== cccc ====

  render() {
    let displayCalendar = !this.state.reveal
      ? { display: "none" }
      : { display: null };

    let status = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    let monthYear = this.updateCurrentParams();
    let listOfColorDates = this.colorDates();
    //let lastFillDate = Boolean(this.state.endDate) === true;
    let hide = Boolean(this.state.startDate);

    // ===== cccc ====
    var today = new Date().toISOString().split("T")[0];
    let startDate0 = this.state.startDate ? this.state.startDate : today;
    let endDate0 = this.state.endDate;
    let u1 = this.state.avalibility;
    let u2 = { ...this.state.avalibility };
    let unavailSize = Object.keys(u2).length;

    let Grid0Month = this.makeDateFrMonthYear(
      this.state.monthNumber,
      this.state.year
    );

    if (startDate0) {
      // date object given a this.state.startDate
      let startDate0Month = this.makeDateFrDateStrMonth(startDate0);
      let startDateDay = Number(startDate0.slice(-2));

      if (startDate0Month > Grid0Month) {
        let i;
        for (i = 0; i <= unavailSize; i++) {
          u2[i] = false;
        }
      } else if (startDate0Month < Grid0Month) {
        // do nothing...
      } else {
        let i;
        for (i = 0; i < startDateDay; i++) {
          u2[i] = false;
        }
      }
    }

    return (
      <div id="calendar-app">
        <PricePerNight />
        <CheckInOut
          status={status}
          revealCalendar={this.revealCalendar}
          revealState={this.state.reveal}
        />
        <div className="calendar" style={displayCalendar}>
          <MonthIndicator
            month={this.state.month}
            year={this.state.year}
            updateDateMonth={this.updateDateMonth}
          />
          <DayOfWeek />
          <DateGridList
            monthYear={monthYear}
            days={this.state.days}
            updateStartEndDate={this.buttonCLick}
            mouseEnter={this.mouseEnter}
            listOfColorDates={listOfColorDates}
            //lastFillDate={lastFillDate} // sends T or F if there exist a last date
            avalibility={u2}
          />
          <ClearDate hide={hide} clearState={this.clearState} />
        </div>
        <Guest />
        <PriceInformation status={status} />
        <div id="button-reserve">Reserve</div>
        {/* <ExtraInfo status={status} /> */}
      </div>
    );
  }
}

export default App;
