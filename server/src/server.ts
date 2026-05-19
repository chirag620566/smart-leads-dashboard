import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("SERVER WORKING");
});

app.listen(5000, () => {
  console.log("RUNNING ON 5000");
});