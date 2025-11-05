// import { useState, useEffect } from 'react'
import "../App.css"


function Cardfield() {

    const myid = 
    useEffect(() => {fetch("http://localhost:3000/gethand")
            .then(response => response.json())

            .then(data => {})
    },[])

    return (
      <>
        <div className="card" style={{ border: "1px" }}>
            <div>Welcome to the card field!</div>
        </div>
      </>

      //use effect
      //call index js with api call to get hand

    )
  }
  
export default Cardfield