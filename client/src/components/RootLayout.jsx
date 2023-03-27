import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

function RootLayout() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <Outlet context={{username, setUsername, socket}} />
    </div>
  )
}

export default RootLayout