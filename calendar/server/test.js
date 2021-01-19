const axios = require("axios");

axios
  .get("http://localhost:3001/month", {
    params: {
      id: 1,
      month: "02",
      year: "2020",
    },
  })
  .then(function (response) {
    console.log(response.data);
    //console.log('axios', response.data);
  })
  .catch(function (error) {
    console.log("error");
  });
