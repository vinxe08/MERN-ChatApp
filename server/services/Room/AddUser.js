const Users = require("../../models/Room");

module.exports = async (id, username) => {
  try {
    const data = await Users.findOneAndUpdate({ roomID: id}, {$push: {users: {username: username, message: ''}}});
    return true
  } catch(error) {
    return false
  }
}