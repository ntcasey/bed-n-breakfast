var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "calendar",
});

connection.connect(function (err) {
  if (err) {
    console.log("login failure, mysql -u root");
  } else {
    console.log("DB Connection Success @ db/index.js");
  }
});

const getMonthAvalibility = function (params, callback) {
  var getAvalDatesSQL = `SELECT * from availability where addrID = ${params.id}`;
  connection.query(getAvalDatesSQL, function (err, data) {
    if (err) {
      console.log("error @getMonthAvalibility");
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  getMonthAvalibility,
  connection,
};
