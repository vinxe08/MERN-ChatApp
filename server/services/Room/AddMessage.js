const Users = require("../../models/Room");

module.exports = async (room, username, message) => {
  try {
    const data = await Users.findOneAndUpdate({ roomID: room}, {$push: {users: {username: username, message: message}}});
    return true
  } catch(error) {
    return false
  }
}