const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/add-user", usersController.getCreateUser);

router.post("/add-user", usersController.createUser);

router.get("/edit-user/:userId", usersController.getEditUser);

router.post("/edit-user", usersController.updateUser);

router.get("/:userId", usersController.getUserById);

router.post("/delete-user", usersController.deleteUser);

module.exports = router;
