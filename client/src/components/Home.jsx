import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useOutletContext } from 'react-router-dom';
import './Home.css'
import { BsPersonCircle } from 'react-icons/bs'
import { GiGreenhouse } from 'react-icons/gi'
import { ImEnter } from 'react-icons/im'

function Home() {
  const [room, setRoom] = useState("");
  const {username, setUsername, socket} = useOutletContext()
  const navigate = useNavigate();

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      const createRoom = await axios.post('http://localhost:3001/room/create', 
      { roomID: room,
        users: [
          {
            username: username,
            message: '',
          }
      ]})

      if(createRoom){
        socket.emit("join_room", room);
        navigate(`/room/${room}`)
      }
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
          <h3 className='homeTitle'>Join A Chat</h3>
          <div className='groupField'>
            <BsPersonCircle size="3rem" color='#1E90FF' />
            <input
              className='nameField'
              type="text"
              placeholder="Your name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className='groupField'>
            <GiGreenhouse size="3rem" color='#00FA9A' />
            <input
              className='roomField'
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          
          <button className='joinButton' onClick={joinRoom}><ImEnter size="3rem" color='#6495ED' style={{ marginRight: 10 }} /> Join A Room</button>
        </div>
    </div>
  )
}

export default Home