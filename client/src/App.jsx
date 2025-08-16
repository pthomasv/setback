import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Readybutton from './buttons/readybutton';

function App() {
  const [count, setCount] = useState(0)
  const [connections, setConnections] = useState([])
  const [startmessage, setStartmessage] = useState("game pending")
  const [myhand, setMyhand] = useState([])
  const [mysocket, setMysocket] = useState([])
  const [readies, setReadies] = useState([])
  const [players, setPlayers] = useState({})

  

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  
  

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

    return () => socket.disconnect();

  }, []);





  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => fetch("http://localhost:3000/start")
          .then(response => response.text())
          .then(text => setStartmessage(text)
          )}>Start Game</button>
        <button>{startmessage}</button>
        <button>Total Players: {connections.length}</button>
        <button onClick={() => fetch("http://localhost:3000/deal")
          .then(response => response.json())
          .then(hand => console.log(hand))
          }>Deal</button>
          <button>{myhand}</button>
          <Readybutton id={mysocket.id} socket={mysocket}/>
      </div>
      <form id="form" action="">
        <input id="input" autoComplete="off" /><button>Send</button>
      </form>
    </>
  )
}

export default App
