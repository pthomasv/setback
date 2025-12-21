import { useState, useEffect } from 'react'
import "../App.css"
import {cards} from "../assets/Faces.js"

function Cardfield({myID}) {
  const [hand, setHand] = useState([])
  const playable_cards = cards


  useEffect(() => {fetch(`http://localhost:3000/gethand?id=${myID}`)
    .then(response => response.json())
    .then(data => { 
    //   console.log("cards",data.items)
    //   console.log(playable_cards)
      const cards = Object.values(data.items)
      setHand(cards)
      },
    )
  },[])

  // useEffect(() => {
  //   console.log("updated hand:", hand);
  // }, [hand]);

  function sharebidwithserver(bid){
    console.log(bid)
  }

  return (
    <>
      <div style={{ border: "0px red solid", marginBottom: "5vh"}}>
        <div id="OPbidNpass" className="field" style={{ border: "0px red solid"}}>
          <div className="bidbox">
            <div id="opbidof2" className='opbid op2'>2</div >
            <div id="opbidof3" className='opbid op3'>3</div >
            <div id="opbidof4" className='opbid op4'>4</div >
            <div id="opbidof5" className='opbid oppass'>PASS</div >
          </div>
        </div>
          <div className="opbox noselect">
            {hand.map((item,index) => 
            <div style={{backgroundImage: `url(${`/src/assets/backblue.png`})`,backgroundSize: "cover",}} key={index}> 
            {item[1]}</div>)}
          </div>
      </div>
    </>

  )
}
  
export default Cardfield