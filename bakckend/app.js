const express = require("express");
const app = express();
const Post = require("./models/post");
const mongoose = require("mongoose");
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
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accent"
  );
  res.setHeader(
    "Access-Controls-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({ message: "Post Added" });
});
app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    console.log(posts);
    res.status(200).json({
      message: "Posts fetched",
      posts,
    });
  });
});

module.exports = app;
// zTc0JAIjEQLKqQBY
