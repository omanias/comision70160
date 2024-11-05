const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersControllers.js")


router.get("/", usersController.getAllUsers)
router.post("/", usersController.createUser)


module.exports = router