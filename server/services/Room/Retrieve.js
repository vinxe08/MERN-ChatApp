const Room = require('../../models/Room')

module.exports = async () => {
  try {
    const result = await Room.find();
    return result;
  } catch(error) {
    return false;
  }
}