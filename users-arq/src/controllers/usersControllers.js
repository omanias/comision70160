// imporar servicios
const usersService = require("../services/userService.js")

// Obtener usuarios


function getAllUsers(req, res) {
    const users = usersService.getAllUsers()
    res.json(users)
}

function createUser(req, res) {
    const newUser = req.body
    usersService.createUser(newUser)
    res.status(201).json(newUser)
}

module.exports = {
    getAllUsers,
    createUser
}
