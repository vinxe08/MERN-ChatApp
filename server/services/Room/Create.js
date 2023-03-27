const Room = require("../../models/Room");

module.exports = async (data) => {
  try {
    await Room.insertMany(data)
    return true
  } catch(error) {
    return false
  }
}