const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const upload = multer();
//router routes
router.get("/", (req, res, next) => {
  Post.find()
    .then((posts) => {
      console.log(posts)
      res.status(200).json({ message: "posts fetched", posts });
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    res.status(200).json({ message: "post fetched", post });
  });
});
router.post("/", upload.array("image"), (req, res, next) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.files[0].buffer;
  console.log(req.files[0].buffer);
  post
    .save()
    .then(() => {
      res.status(200).send({ message: "added successfully" });
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
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
