require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env
const {seed, getCountries, getFutures, createFutures, deleteFutures} = require('./controller.js')

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.post('/seed', seed)

app.get("/api/compliment", (req, res) => {
  const compliments = ["South Island, New Zealand",
					 "Paris, France",
					 "Banff, Canada",
                     "Grand Canyon, United States",
                     "Santorini, Greece",
                     "Cancun, Mexico", 
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/countries', getCountries)
app.get(`/api/futures`, getFutures)
app.delete(`/api/futures/:id`, deleteFutures)
app.post(`/api/futures`, createFutures)


app.listen(SERVER_PORT, () => console.log(`Server running up on ${SERVER_PORT}`))