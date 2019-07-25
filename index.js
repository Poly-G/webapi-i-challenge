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

server.delete("/api/users/:id", (req, res) => {
  const { id } = request.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "Not deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: true, updated });
      }
    })
    .catch(err => {
      res.status(500).json({ sucess: false, err });
    });
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
