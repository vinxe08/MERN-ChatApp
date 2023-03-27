import React from "react";
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";

const socket = io.connect("http://localhost:3001");

function App() {

  return (
    <Routes>
      <Route element={<RootLayout />}> 
        <Route path="/" element={<Home /> } />
        <Route path="/room/:id" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;