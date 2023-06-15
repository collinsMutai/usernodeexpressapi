const express = require("express");
const isAuth = require('../middleware/is-auth')

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/add-user", isAuth, usersController.getCreateUser);

router.post("/add-user", usersController.createUser);

router.get("/edit-user/:userId", usersController.getEditUser);

router.post("/edit-user", usersController.updateUser);

router.get("/:userId", usersController.getUserById);

router.post("/delete-user", usersController.deleteUser);

module.exports = router;
