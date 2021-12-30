const express = require("express")
const bcrypt = require("bcrypt");


const router = express.Router()
const  {signup, login} = require("../controllers/auth")


router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
