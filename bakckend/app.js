const express = require("express");
const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: "Post Added" });
});
app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "0",
      title: "1th server side post",
      content:
        "Id consequat ut aliquip eu ex ex amet eu officia cupidatat consectetur deserunt excepteur.",
    },
    {
      id: "1",
      title: "2nd server side post",
      content: "Nostrud fugiat dolore nostrud eu culpa fugiat commodo est.",
    },
  ];
  res.status(200).json({
    message: "Posts fetched",
    posts,
  });
});

module.exports = app;
// zTc0JAIjEQLKqQBY
