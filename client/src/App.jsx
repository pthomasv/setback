import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'
import Lobby from './components/lobby';

function App() {

  return (
    <>
    <Lobby></Lobby>
    </>
  )
}

export default App
