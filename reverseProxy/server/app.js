const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// middleware:
const path = require('path');
const url = require("url");
const axios = require('axios');

// Calendar Service
app.get('/month', (req, res) => {
  axios.get('http://3.16.164.208:3001', {
    params: req.query
  })
  .then(({ data }) => {
    res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

// Image Carousel Service
app.get('/gallery/:id', (req, res) => {
  const id = req.query.id;
  axios.get(`http://localhost:3004/gallery/${id}`)
  .then(({ data }) => {
    res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

// Reviews Service
app.get('/api/0', (req, res) => {
  axios.get(`http://localhost:3003/api/0`)
  .then(({ data }) => {
    res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

// Recommendations Service
app.get('/listings', (req, res) => {
  axios.get(`http://52.53.211.102:3002/`)
  .then(({ data }) => {
    res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});


app.listen(3004, () => console.log('Listening on port 3004!'));
app.use(express.static('public'));



