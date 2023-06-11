const express = require("express");

const usersController = require('../controllers/usersController')

const router = express.Router();

router.get("/", usersController.getUser);

router.post("/", usersController.createUser);

router.get("/:id", usersController.getUserById);

router.delete("/:id", usersController.deleteUser);

router.patch("/:id", usersController.updateUser);

module.exports =  router;
