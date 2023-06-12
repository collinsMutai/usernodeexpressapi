const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "views");

const usersRoutes = require("./routes/usersRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", usersRoutes);
app.get("/", (req, res, next) => res.redirect("/users"));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
