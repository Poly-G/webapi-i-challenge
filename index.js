// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  db.add(userInfo)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
