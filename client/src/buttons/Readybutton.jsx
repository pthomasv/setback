import React, { useState } from 'react';
import { io } from "socket.io-client";

function Readybutton({id, socket}) {
    const [readybuttonText, setReadyButtonText] = useState('READY');
    const [readybuttonColor, setReadyButtonColor] = useState('green');
    

    const handleClick = () => {
        if(readybuttonText == "READY"){
            setReadyButtonText('CANCEL'); 
            setReadyButtonColor('red');
            socket.emit('ready from client',true)
        }
        else{
            setReadyButtonText('READY'); 
            setReadyButtonColor('green')
            socket.emit('ready from client',false)
        }
        
    };

    return (
        <button onClick={handleClick} style={{color:readybuttonColor}}>{readybuttonText}</button>
    );
}

export default Readybutton;