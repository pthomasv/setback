import { useState, useEffect } from 'react'



function Suitfield(){
    const [lastselectedsuit, setLastSelectedSuit] = useState()

    function suitSelect(id){
        if(!lastselectedsuit){//first time selecting a card
            setLastSelectedSuit(id)
            const suittohighlight = document.getElementById(id)
            suittohighlight.classList.add("highlight")
        }

        else{
            console.log("last",lastselectedsuit)
            const suittounhighlight = document.getElementById(lastselectedsuit)
            suittounhighlight.classList.remove("highlight")
            setLastSelectedSuit(id)
            const suittohighlight = document.getElementById(id)
            suittohighlight.classList.add("highlight")
        }

    }
        
    return (
    <>
        <div className='suitfieldstyle'>
            {/* <input type="checkbox" id="H" className="suit-input" onChange={(element) => suitSelect(element.target.id)}/>
            <label htmlFor="H" className="suit heart"></label> */}
            <div onClick={(element)=> suitSelect(element.target.id)} id="H" className="suit heart"></div>
            <div onClick={(element)=>suitSelect(element.target.id)} id="S" className="suit spade"></div>
            <div onClick={(element)=>suitSelect(element.target.id)} id="D" className="suit diamond"></div>
            <div onClick={(element)=>suitSelect(element.target.id)} id="C" className="suit club"> </div>
        </div>
    </>
    )
}

export default Suitfield