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
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <>
    pressedStartGame: {pressedStartGame ? "true" : "false"}
    {!pressedJoined && <Landing setTooManyPlayers={setTooManyPlayers} setPressedJoined={setPressedJoined} setGameStarted={setGameStarted}></Landing>}
    {/* we pass "setTooManyPlayers as a argument. If you look at the Landing function, you will see that it expects two arguments, setTooManyPlayers and setPressedJoined" */}
    {!toomanyPlayers && pressedJoined && <Lobby setPressedStartGame={setPressedStartGame}></Lobby>}
    {pressedStartGame && <Cardfield ></Cardfield>}
    {gameStarted && <div>Game In Progress</div>}
    {toomanyPlayers && <div>Lobby Full</div>}
    </>
  )
}

export default App
