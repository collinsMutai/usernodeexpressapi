const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/userModel");

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "views");

const usersRoutes = require("./routes/usersRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "should be longer",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(adminRoutes);
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
