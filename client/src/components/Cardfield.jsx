import { useState, useEffect } from 'react'
import "../App.css"
import {cards} from "../assets/Faces.js"
import { io } from "socket.io-client";

function Cardfield({myID, setBidNplayer}) {
  const [hand, setHand] = useState([])
  const [lastselectedbidID, setLastselectedbidID] = useState("")
  const [lastselectedcardID, setLastSelectedcardID] = useState()
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

  function handleCardClick2(index){
    
    if(!lastselectedcardID && lastselectedcardID != 0){//first time selecting a card
      setLastSelectedcardID(index)
      const cardtoraise = document.getElementById(index)
      cardtoraise.classList.add("raise")
    }

    else if(lastselectedcardID == index){ //either you lower the card you choose or raise it up again
      console.log("here!")
      const repeatedcard = document.getElementById(index)
      console.log(repeatedcard.classList)
      repeatedcard.classList.contains("raise") ? repeatedcard.classList.remove("raise") : repeatedcard.classList.add("raise")
    }

    else{
      const cardtolower = document.getElementById(lastselectedcardID)
      cardtolower.classList.remove("raise")
      setLastSelectedcardID(index)
      const cardtoraise = document.getElementById(index)
      cardtoraise.classList.add("raise")
    }

    
    //increase hight 
    //record chosen card
    //chosing next card should lower previous and raise new
    //enable confirm button
  }


  function handleConfirm(){
    const confirm = document.getElementById("confirmbid")
    confirm.classList.add("disabled")
    const bidbox = document.getElementById("bidbox") //confirming the bid will shut off all bid options so they can't be clicked 
    bidbox.classList.add("unclickable")
    setBidNplayer([lastselectedbidID,myID])
  }

  function handleBidclick(id){
    if(lastselectedbidID){
      const lastselected = document.getElementById(lastselectedbidID)
      lastselected.classList.remove("selected")
    }
    setLastselectedbidID(id)
    const currentselected = document.getElementById(id)
    currentselected.classList.add("selected")
    const confirm = document.getElementById("confirmbid")
    confirm.classList.remove("disabled")
  }

  return (
    <>
      <div style={{ border: "1px", marginTop: "5vh"}}>
          <div className="box noselect">
            {hand.map((item,index) => 
            <div id={index} onClick={() => handleCardClick2(index)}  //need to use annoymous function, otherwise the function is called on render and assigned to onclick 
            style={{backgroundImage: `url(${`/src/assets/face/${item[1]}@1x.png`})`,backgroundSize: "cover",}} key={index}> 
            {item[1]}</div>)}
          </div>
          <div id="bidNpass" className="field "style={{border: "red solid 0px"}}>
            <div id="bidbox" className="bidbox noselect ">
              <div id="2" onClick={(element) => {handleBidclick(element.target.id)}} className='bid disabled b2'>2</div >
              <div id="3" onClick={(element) =>{handleBidclick(element.target.id)}} className='bid b3 disabled'>3</div >
              <div id="4" onClick={(element) =>{handleBidclick(element.target.id)}} className='bid b4 disabled'>4</div >
              <div id="5" onClick={(element) =>{handleBidclick(element.target.id)}} className='bid pass disabled'>PASS</div >
            </div>
            {/* <div><b>YOUR BID</b></div> */}
            <button id="confirmbid" className='pulse-button disabled' onClick={()=> {handleConfirm()}}><b>CONFIRM</b></button>
          </div>
      </div>
    </>

  )
}
  
export default Cardfield