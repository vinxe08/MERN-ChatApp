const express = require('express')
const router = express.Router();

// Services
const CreateService = require('../services/Room/Create')
const RetrieveService = require('../services/Room/Retrieve')
const RetrieveOneService = require('../services/Room/RetrieveOne')
const AddUserService = require('../services/Room/AddUser')
const AddMessageService = require('../services/Room/AddMessage')

router.post('/create', async (req, res) => {
  const { roomID, users } = req.body; 
  const retrieve = await RetrieveService()

  const userName = users[0].username

  const id = retrieve.filter(i => i.roomID === roomID)[0].roomID
  const data = retrieve.filter(d => d.roomID === roomID)[0]
  const filteredUser = data.users.filter(user => user.username === userName )
  
  // If the username is already in Database
  if(roomID === id && filteredUser) {
    res.status(200).send({status: true, message: 'Successfully Join in Room'})
    
  } else if(roomID !== id && data[0].username !== users[0].username) {
    // For new room id
    const result = await CreateService({roomID, users})
    
    res.status(200).send({status: result, message: 'Successfully Room Created'})
  } else if(roomID === id && data[0].username !== users[0].username ){
    // For old room but the new user joining
    const result = await AddUserService(roomID, userName)
    res.status(200).send({status: result, message: 'Successfully Join in a Room'})
    
  } else {
    res.status(500).send({ status: false, message: 'Room not created!!!'})
  }
})

router.post('/retrieve', async (req, res) => {
  const { roomID } = req.body
  const results = await RetrieveOneService(roomID)

  if (results) {
    res.status(200)
      .send(results)
  } else {
    res.status(500)
      .send({
        status: results,
        message: 'Not Retrieved!'
      })
  }
})

router.post('/update', async (req, res) => {
  const { _id, set } = req.body

  const results = await UpdateService(_id, set)

  if(results){
    res
      .status(200)
      .send({
        status: results,
        message: 'Successfully Updated!'
      })
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: 'Not Updated!'
      })
  }
})

router.post('/addMessage', async (req, res) => {
  const { room, username, message } = req.body

  const results = await AddMessageService(room, username, message)

  if(results){
    res
      .status(200)
      .send({
        status: results,
        message: 'Successfully Updated!'
      })
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: 'Not Updated!'
      })
  }
})



module.exports = router