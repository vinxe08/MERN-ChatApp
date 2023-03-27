const Room = require('../../models/Room')

module.exports = async (roomID) => {
  try {
    const result = await Room.findOne({ roomID: roomID});
    return result;
  } catch(error) {
    return false;
  }
}