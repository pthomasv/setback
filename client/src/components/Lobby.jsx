import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import Readybutton from '../buttons/readybutton';
import "../App.css"


function Lobby() {
    // const socketRef = useRef(null) // store the socket in a useRef to avoid re-renders
    const [count, setCount] = useState(0)
    const [connections, setConnections] = useState([])
    const [startmessage, setStartmessage] = useState("game pending")
    const [myhand, setMyhand] = useState([])
    const [mysocket, setMysocket] = useState([])
    const [readies, setReadies] = useState([])
    const [players, setPlayers] = useState({})
    const [allplayersready, setAllplayersready] = useState("Waiting On Players...")
    const [showcards, setShowCards] = useState(false)
  
    
  
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    
    function handleStartGameButtonClick() {
      if (!mysocket) {return}
      console.log("Button clicked!");
      mysocket.emit("pressed start", mysocket.id)
      // setPressedStartGame(true)

    }
  
    useEffect(() => {
      const socket = io("http://localhost:3000"); // your server URL
      setMysocket(socket)
      socket.on("connect", () => {
        console.log("connected with id:", socket.id);
      });
  
      socket.on('list of connected ids', (connectedIds) => {
        setConnections(connectedIds)
      });
  
      socket.on('players', (players) => {
        setPlayers(players)
      })
  
      socket.on("all players ready",msg => {
        setAllplayersready(msg)
      })

      socket.on("reveal decks", bool => {
        setShowCards(bool)
      })
  
      return () => socket.disconnect();
  
    }, []);
  
  
  
    return (
      <>
        <div className="listofplayers" style={{ border: "1px solid red" }}>
            <div>
              {connections.map((id) => (
              <div key={id}>
                <button>player {connections.indexOf(id)+1}</button>
                <button>{players[id].ready ? "Ready" : "Not Ready"}</button>
              </div>
              ))}
            </div>
        </div>
        <div className="card" style={{ border: "1px solid red" }}>
          <button id="startGameButton" onClick={handleStartGameButtonClick}>{allplayersready}</button>
          <Readybutton id={mysocket.id} socket={mysocket}/>
        </div>
        {/* <form id="form" action="">
          <input id="input" autoComplete="off" /><button>Send</button>
        </form> */}
      </>
    )
  }
  
  export default Lobby