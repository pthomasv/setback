import { useState, useEffect } from 'react'
import "../App.css"
import {cards} from "../assets/Faces.js"

function Cardfield({myID}) {
  const [hand, setHand] = useState([])
  const playable_cards = cards


  useEffect(() => {fetch(`http://localhost:3000/gethand?id=${myID}`)
    .then(response => response.json())
    .then(data => { 
      console.log("cards",data.items)
      console.log(playable_cards)
      const cards = Object.values(data.items)
      setHand(cards)
      },
    )
  },[])

  // useEffect(() => {
  //   console.log("updated hand:", hand);
  // }, [hand]);

  return (
    <>
      <div style={{ border: "1px"}}>
          {/* <div>Welcome to the card field!</div>
          <div>Your ID is: {myID} </div>
          <div>Your cards are: </div> */}
          <div className="box">
            {hand.map((item,index) => 
            <div style={{backgroundImage: `url(${`/src/assets/face/${item[1]}@1x.png`})`,backgroundSize: "cover",}} key={index}> 
            {item[1]}</div>)}
          </div>
          <div className="bidbox">
            <div className='bid2 cssbuttons-io'>2</div >
            <div className='bid3 cssbuttons-io'>3</div>
            <div className='bid4 cssbuttons-io'>4</div>
            <div className='pass'>PASS</div>
          </div>
          <div><b>YOUR BID?</b></div>
      </div>
    </>

  )
}
  
export default Cardfield