import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'
import Lobby from './components/lobby';
import Landing from './components/Landing';
import Cardfield from './components/Cardfield';

function App() {
  const [pressedJoined, setPressedJoined] = useState(false)
  const [pressedStartGame, setPressedStartGame] = useState(false)
  const [toomanyPlayers, setTooManyPlayers] = useState(false)

  return (
    <>
    {!pressedJoined && <Landing setTooManyPlayers={setTooManyPlayers} setPressedJoined={setPressedJoined} ></Landing>}
    {!toomanyPlayers && pressedJoined && <Lobby pressedStartGame={pressedStartGame} setPressedStartGame={setPressedStartGame}></Lobby>}
    {pressedStartGame && <Cardfield></Cardfield>}
    {toomanyPlayers && <div>Lobby Full</div>}
    </>
  )
}

export default App
