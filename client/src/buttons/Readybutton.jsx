import React, { useState } from 'react';
import { io } from "socket.io-client";

function Readybutton({disconnect, id, socket}) {
    const [readybuttonText, setReadyButtonText] = useState('READY-UP');
    const [readybuttonColor, setReadyButtonColor] = useState('green');
    
    // if(disconnect){
    //     setReadyButtonText('READY-UP'); 
    //     setReadyButtonColor('green')
    // }

    const handleClick = () => {
        if(readybuttonText == "READY-UP"){
            setReadyButtonText('CANCEL'); 
            setReadyButtonColor('red');
            socket.emit('ready from client',true)
        }
        else{
            setReadyButtonText('READY-UP'); 
            setReadyButtonColor('green')
            socket.emit('ready from client',false)
        }
        
    };

    return (
        <button onClick={handleClick} style={{color:readybuttonColor}}>{readybuttonText}</button>
    );
}

export default Readybutton;