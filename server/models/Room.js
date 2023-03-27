const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roomSchema = new Schema({
  roomID: {
    type: String,
    required: true,
  },
  users: [{
    username: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
})

module.exports = mongoose.model('Rooms', roomSchema)
