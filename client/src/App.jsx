import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'
import Lobby from './components/lobby';
import Landing from './components/Landing';
import Cardfield from './components/Cardfield';
import Opfield from './components/Opfield';

function App() {
  const [pressedJoined, setPressedJoined] = useState(false)
  const [pressedStartGame, setPressedStartGame] = useState(false)
  const [toomanyPlayers, setTooManyPlayers] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [myID, setMyID] = useState("")
  const [bidNplayer, setBidNplayer] = useState([])
  const [myturn, setMyturn] = useState(-1) //-1 signifies turn has not been established yet


  useEffect(() => {
      console.log("its a ",bidNplayer[0], "by player", bidNplayer[1])

    }, [bidNplayer]

  )

  return (
    <>
    {pressedStartGame && <Opfield myID={myID}></Opfield>}
    {/* pressedStartGame: {pressedStartGame ? "true" : "false"} */}
    {!pressedJoined && <Landing setTooManyPlayers={setTooManyPlayers} setPressedJoined={setPressedJoined} setGameStarted={setGameStarted}></Landing>}
    {/* we pass "setTooManyPlayers as a argument. If you look at the Landing function, you will see that it expects two arguments, setTooManyPlayers and setPressedJoined" */}
    {!toomanyPlayers && pressedJoined && <Lobby setPressedStartGame={setPressedStartGame} setMyID={setMyID} bidNplayer={bidNplayer} setMyturn={setMyturn}></Lobby>}
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
      {pressedStartGame && <div><b>{myturn == 1 ? "YOUR TURN" : "OPPONENT'S TURN"}</b></div>}
      <div className="suit heart"> </div>
      <div className="suit spade"> </div>
      <div className='suit' style={{backgroundImage: `url(${"/src/assets/diamond.svg"})`, backgroundSize: "cover", border: "red solid 0px", backgroundRepeat: "no-repeat",backgroundPosition: "center", height: "100px",width:"100px"}}> </div>
      <div className="suit club"> </div>
      


    </div>
    {pressedStartGame && <Cardfield myID={myID} setBidNplayer={setBidNplayer}></Cardfield>}
    {gameStarted && <div>Game In Progress</div>}
    {toomanyPlayers && <div>Lobby Full</div>}
    </>
  )
}

export default App
