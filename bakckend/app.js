const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
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
app.use(express.static("public"));
//routes
app.use("/api/posts", postRoutes);

module.exports = app;
