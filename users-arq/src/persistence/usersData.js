let users = []

module.exports = {
    getAllUsers: () => users,
    createUser: (newUser) => {
        users.push(newUser)
    }
}