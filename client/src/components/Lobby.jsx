import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import Readybutton from '../buttons/readybutton';
import "../App.css"


function Lobby({setPressedStartGame, setMyID, bidNplayer, setMyturn}) {
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
    const [test, setTest] = useState(0)
    const [disconnect, setDisconnect] = useState(false)
    const [bid, setBid] = useState();
  
  
    // const form = document.getElementById('form');
    // const input = document.getElementById('input');
    // const messages = document.getElementById('messages');
    
    function handleStartGameButtonClick() {
      if (!mysocket) {return}
      if (allplayersready == "Waiting On Players...") {return}
      console.log("Button clicked!");
      console.log(test)
      console.log("allplayersready",{allplayersready},"so I was able to press start")
      mysocket.emit("pressed start", mysocket.id);
      
    }
  
    useEffect(() => {
      const socket = io("http://localhost:3000"); // your server URL
      setMysocket(socket)
      socket.on("connect", () => {
        console.log("connected with id:", socket.id);
        setMyID(socket.id);
        console.log("my id is ",socket.id)
      });
  
      socket.on('list of connected ids', (connectedIds) => {
        setConnections(connectedIds)
      });
  
      socket.on('players', (players) => {
        setPlayers(players)
      })
  
      socket.on("all players ready", msg => {
        setAllplayersready(msg)
      })

      socket.on("reveal decks", bool => {
        setShowCards(bool)
      })

      socket.on("turn", (turn) => {
        console.log("its my turn!")

        //because its my turn, we can enable all the bid options

        const bid2 = document.getElementById("2")
        const bid3 = document.getElementById("3")
        const bid4 = document.getElementById("4")
        const bidpass = document.getElementById("0")
        const bidbox = document.getElementById("bidbox") //confirming the bid will shut off all bid options so they can't be clicked 

        if(!bid2){
          return
        }
        bid2.classList.remove("disabled")
        bid3.classList.remove("disabled")
        bid4.classList.remove("disabled")
        bidpass.classList.remove("disabled")
        bidbox.classList.remove("unclickable")

        setMyturn(turn) // this sets myturn to 1
      })

      socket.on("notturn", (turn) => {
        console.log("its NOT my turn!")
        // const OPbidNpass = document.getElementById("OPbidNpass") //uncomment if you wish to hid the opponents bid
        // OPbidNpass.classList.remove("hide")
        setMyturn(turn) // this sets myturn to 0
      })

      socket.on("opponent's bid", (opbid) => {
        console.log("opponent's bid!!!", opbid)
        const IDtohighlight = "opbidof"+opbid
        const opbuttontohighlight = document.getElementById(IDtohighlight)
        opbuttontohighlight.classList.add("highlight")
      })

      socket.on('show cardfield', bool => {
        setPressedStartGame(bool)
        const startNready = document.getElementById("startNready")
        startNready.classList.add("hide")
        const listofplayers = document.getElementById("listofplayers")
        listofplayers.classList.add("hide")
        }
      )
  
      return () => {socket.disconnect()};
  
    }, []);



    useEffect(() => {
      console.log("MY SOCKET", mysocket)
      if(mysocket.length===0){ //because bidNplayer is passed to lobby in App.jsx before it is defined, mysocket.emit will not work
        return //thus we must wait until it is populated with something ie it doesnt equal 0
      }
      mysocket.emit("my bid", bidNplayer)
    }, [bidNplayer])
    
  
  
  
    return (
      <>
        <div id="listofplayers" className="listofplayers">
              {connections.map((id) => (
              <div key={id}>
                <button className='player-btn'>player {connections.indexOf(id)+1}</button>
                <button className='player-btn'>{players[id].ready ? "Ready" : "Not Ready"}</button>
              </div>
              ))}
        </div>
        <div id="startNready" className="card noselect">
          <button className='player-btn' id="startGameButton" onClick={handleStartGameButtonClick}>{allplayersready}</button>
          <Readybutton disconnect={disconnect} id={mysocket.id} socket={mysocket}/>
        </div>
        {/* <form id="form" action="">
          <input id="input" autoComplete="off" /><button>Send</button>
        </form> */}

      </>
    )
  }
  
  export default Lobby