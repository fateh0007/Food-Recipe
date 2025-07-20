const express = require("express");
const User = require("../models/user");
const { getUser, userSignUp, userLogin } = require("../controller/user");
const router = express.Router();

router.post('/signUp',userSignUp);
router.post('/login', userLogin);
router.get('/user/:id', getUser)

module.exports = router;