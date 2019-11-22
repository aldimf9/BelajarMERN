const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
var app = express();
const port = process.env.PORT || 5000;
const mongoUrl = "mongodb://localhost:27017/db_saia";
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
var Users = require("./routes/Users");
app.use("/users", Users);
app.listen(port, () => console.log("mlaku"));
