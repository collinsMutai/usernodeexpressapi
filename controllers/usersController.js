const User = require("../models/userModel");

const mongodb = require("mongodb");

exports.getCreateUser = (req, res, next) => {
  res.render("addedit", {
    editing: false,
    path: "/users/add-user",
  });
};

exports.createUser = (req, res, next) => {
  const { firstName, lastName, age } = req.body;

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    age: age,
  });

  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditUser = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return redirect("/");
  }

  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.redirect("/");
      }
      res.render("addedit", {
        editing: editMode,
        user: user,
        path: "/users/edit-user",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { firstName, lastName, age, userId } = req.body;

  User.findById(userId)
    .then((user) => {
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (age) {
        user.age = age;
      }
      return user.save();
    })
    .then(() => {
      console.log("user updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users", {
        users: users,
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.render("user-detail", {
        user: user,
        path: "/users",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.body;

  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
