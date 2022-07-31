const express = require("express");
const app = express();
const Post = require("./models/post");
const mongoose = require("mongoose");
const { update } = require("./models/post");
//connection
mongoose
  .connect(
    "mongodb+srv://aytgn:zTc0JAIjEQLKqQBY@meanmaincluster.5x8op.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB connection failed");
  });
//middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accent"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});
//methods
app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({ message: "posts fetched", posts });
  });
});
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    res.status(200).json({ message: "post fetched", post });
  });
});
app.post("/api/posts", (req, res, next) => {
  const post = new Post(req.body);
  post
    .save()
    .then((post) => res.status(201).json({ message: "post created!" }))
    .catch((err) => res.status(400).json("an error occurred"));
});
app.put("/api/posts/:id", (req, res, next) => {
  const postToEdit = req.body;
  const filter = { _id: req.params.id };
  const update = { title: postToEdit.title, content: postToEdit.content };
  Post.findOneAndUpdate(filter, update).then((info) => {
    res.status(200).send({ message: "updated successfully" });
  });
});
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "Post deleted" });
  });
});
module.exports = app;
// zTc0JAIjEQLKqQBY
