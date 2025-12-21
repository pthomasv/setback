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

      socket.on("turn", (data) => { //data is a data {"turn": turn}
        setTimeout(function() {
          console.log("This message appears after 2 seconds.");
        }, 2000); // 2000 milliseconds = 2 seconds

        console.log("its my turn!")
        console.log(data)
        setMyturn(data.turn)

        //if a bid is present in the data, then that must be what the oppenent bid. 
        console.log("data.bid", data.bid)
        data.bid ? console.log("it exists") : console.log("it doesnt exist")
        if(data.bid){
          console.log("in the lop")
          const opsbid = data.bid
          console.log("datab.id 2", data.bid)
          for(let i = parseInt(opsbid)+1; i<6; i++){
            const temp = document.getElementById(String(i))
            console.log("temp",temp)
            temp.classList.remove("disabled")
          }
        } 
        else{ //else, it means we are betting first. enable all buttons
          for(let i = 2; i<6; i++){
          const temp = document.getElementById(String(i))
          if(temp){temp.classList.remove("disabled")}
        }
        }
        // let opsbid = data.bid ?? 2; assidn opsbid to data bid if it exists, else 2
        
        const bidbox = document.getElementById("bidbox") //confirming the bid will shut off all bid options so they can't be clicked 
        bidbox.classList.remove("unclickable")

        console.log("setting my turn varaible to ",data.turn)
        setMyturn(data.turn) // this sets myturn to 1
      })

      socket.on("notturn", (turn) => {
        console.log("its NOT my turn!")
        // const OPbidNpass = document.getElementById("OPbidNpass") //uncomment if you wish to hid the opponents bid
        // OPbidNpass.classList.remove("hide")
        setMyturn(turn) // this sets myturn to 0
      })

      socket.on("opponent's bid", (data) => { //data is an object {"turn": turn, "bid":bidNplayer[0]}
        console.log("opponent's bid!!!", data["bid"])
        const IDtohighlight = "opbidof"+data["bid"]
        const opbuttontohighlight = document.getElementById(IDtohighlight)
        opbuttontohighlight.classList.add("highlight")

        //if the bid is a pass, disable the pass button for you
        if(data["bid"] == "5"){
          console.log("oppenent passed! I have to bid at least 2")
          const passbutton = document.getElementById("5")
          passbutton.classList.add("disabled")
        }

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