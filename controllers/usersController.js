const User = require("../models/userModel");

const mongodb = require("mongodb");

const { v4: uuidv4 } = require("uuid");

// let users = [];

exports.createUser = (req, res, next) => {
  const user = req.body;

  const userWithId = users.push({ ...user, id: uuidv4() });

  res.send(`user ${user.firstName} added to ${userWithId}`);
};

exports.getUser = (req, res, next) => {
  User.find().then((users) => {
    console.log(users);
    res.send(users);
  });
};

exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById({ _id: new mongodb.ObjectId(id) }).then((user) => {
    console.log(user);
    res.send(user);
  });
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndRemove({ _id: new mongodb.ObjectId(id) }).then(() => {
    console.log("user deleted");
    res.send(`user ${id} deleted from db`);
  });
};

exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  
  const { firstName, lastName, age } = req.body;

  User.findById({ _id: new mongodb.ObjectId(id) })
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
    });

  res.send(`user ${id} updated`);
};
