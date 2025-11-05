import { useState, useEffect } from 'react'
import "../App.css"

function Landing({setTooManyPlayers, setGameStarted, setPressedJoined}) {

    return (
      <>
        <div className="card" style={{ border: "1px" }}>
            <button onClick={() => fetch("http://localhost:3000/canijoin")
            .then(response => response.json())

            .then(data => { //data = {game_started <bool>, players <{}>}
              var game_started = data["game_started"]
              var length = Object.keys(data["players"]).length
              // if(game_started){
              //   setGameStarted(false)
              // }
              if (length > 3){
                setTooManyPlayers(true)
              }
              else{
                setTooManyPlayers(false)
                setPressedJoined(true)
              }

            }
          )

            }>Join Game</button>
        </div>
      </>
    )
  }
  
export default Landing