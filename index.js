// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

// get users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500).json({
          success: false,
          error: "The users information could not be retrieved."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});

// get specific user
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err,
        message: "The user with the specified ID does not exist."
      });
    });
});

// add user
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }

  db.insert({ name, bio })
    .then(() => {
      res.status(201).json({ name, bio });
    })
    .catch(() => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the user to the database"
        });
      return;
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
