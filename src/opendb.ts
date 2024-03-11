import "./db"

const Schedule = require("./schemas/schedule")
const express = require('express');

function handleListening() {
  console.log("Listening to localhost:3000/");
}

const app = express();

app.listen(3001, handleListening);