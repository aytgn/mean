const express = require("express");
const router = express.Router();

const Post = require("../models/post");

//router routes
router.get("/", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({ message: "posts fetched", posts });
  });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    res.status(200).json({ message: "post fetched", post });
  });
});
router.post("/", (req, res, next) => {
  const post = new Post(req.body);
  post
    .save()
    .then(() => res.status(201).json({ message: "post created!" }))
    .catch(() => res.status(400).json("an error occurred"));
});
router.put("/:id", (req, res, next) => {
  const postToEdit = req.body;
  const filter = { _id: req.params.id };
  const update = { title: postToEdit.title, content: postToEdit.content };
  Post.findOneAndUpdate(filter, update).then(() => {
    res.status(200).send({ message: "updated successfully" });
  });
});
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "Post deleted" });
  });
});

module.exports = router;