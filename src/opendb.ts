import express from "express";

function handleListening() {
  console.log("Listening to localhost:3000/");
}

const app = express();

function startListen() {
  app.listen(3000, handleListening);
}

export { startListen };
