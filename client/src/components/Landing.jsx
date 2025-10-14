import { useState, useEffect } from 'react'
import "../App.css"

function Landing({setTooManyPlayers, setPressedJoined}) {
  
    return (
      <>
        <div className="card" style={{ border: "1px" }}>
            <button onClick={() => fetch("http://localhost:3000/players")
            .then(response => response.json())
            .then(players => {
              const length = Object.keys(players).length;
              console.log("player count is now "+length)
              if(length > 3){
                setTooManyPlayers(true)
              }
              else{
                setTooManyPlayers(false)
                setPressedJoined(true)
              }
            })

            }>Join Game</button>
        </div>
      </>
    )
  }
  
export default Landing