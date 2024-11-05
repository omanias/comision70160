const usersData = require("../persistence/usersData.js")

function getAllUsers() {
    return usersData.getAllUsers()
}

function createUser(newUser) {
    usersData.createUser(newUser)
}

module.exports = {
    getAllUsers,
    createUser
}