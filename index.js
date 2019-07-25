// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/db", (req, res) => {
  db.find()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
