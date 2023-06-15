const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();



router.get("/signup", adminController.getSignup);

router.post("/signup", adminController.postSignup);

router.get("/login", adminController.getLogin);

router.post("/login", adminController.postLogin);

router.post('/logout', adminController.postLogout)

module.exports = router;
