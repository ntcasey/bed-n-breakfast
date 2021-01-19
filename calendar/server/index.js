const express = require("express");
const app = express();
const db = require("./db");
const parser = require("body-parser");
//const compression = require("compression");

//app.use(compression());
app.use(parser.json());

const path = require("path");
const PORT = 3001;

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/month", (req, res) => {
  const params = req.query;

  db.getMonthAvalibility(params, (err, data) => {
    if (err) {
      console.log("error @ getMonthAvalibility:");
      console.log("making all days avalable now");
      res.json([]);
    } else {
      //console.log("data @ index", data);
      const individualDayArr = [];
      data.forEach((item) => {
        const startDate = item.startDate;
        const endDate = item.endDate;

        while (startDate <= endDate) {
          let indDate = startDate.toISOString().split("T")[0];
          individualDayArr.push(indDate);
          startDate.setDate(startDate.getDate() + 1);
        }
      });

      let month_year = `${params.year}-${params.month}`;
      const filtered = individualDayArr.filter((item) =>
        item.includes(month_year)
      );

      res.json(filtered);
    }
  });
});

app.listen(PORT, () => console.log("Listening on port: " + PORT));
