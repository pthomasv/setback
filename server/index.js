//app.listen() is a convenience method → internally does http.createServer(app).listen(...) for you.
//createServer(app) is needed only if you want direct access to the underlying HTTP server.

import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { cards } from "./cards.js"
import { Queue } from "./cards.js"
import { FYshuffle } from './cards.js';

let shuffledDeck_Queue = new Queue;
const app = express();
const server = createServer(app);
const players = {};
var game_started = false;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // allow socket.io connections from :5173
        methods: ["GET", "POST"]
      }  
})

function newDeck(){
    while(shuffledDeck_Queue.length()>=0){
        shuffledDeck_Queue.dequeue()
    }
    FYshuffle(cards);
    for (let i = 0; i < 52; i++) {
        shuffledDeck_Queue.enqueue(cards[i]);
    }
}

function giveAllPlayersCards(){
  console.log("all players given cards")
  
}

function checkIfAllPlayersAreReady(){
  for(const player in players){
    console.log(player)
    if(!players[player]["ready"]){
      return false
    }
  }
  return true
}

function checkIfThereAreEnoughPlayers(){
  const length = Object.keys(players).length
  console.log("there are "+length+" players in the loby")
  if(length > 1 && length < 5){
    return true
  }
}

function whowinsbid(player1Bid, player2Bid){
    
  
}


app.use(cors({
    origin: "http://localhost:5173", // allows HTTP requests from :5173
    methods: ["GET", "POST"]
  }));

//allow all connections
//app.use(cors());


let connectedIds = []

app.get('/', (req, res) => {
  console.log("page loaded")
});

app.get('/gethand', (req, res) =>{
  res.send(players[req.query.id]["deck"])
})

// app.get('/start', (req,res) => {
//     newDeck()
//     if(connectedIds.length < 2){
//         res.send("not enough players")
//     }
//     else{
//         res.send("enough players")       
//     }  
// })

app.get('/deal', (req,res) => {
    let hand = new Queue
    for (let i = 0; i < 7; i++) {
        hand.enqueue(shuffledDeck_Queue.dequeue());
    }
    res.json(hand.printQueue)
})

app.get("/players", (req, res) => {
  res.send(players);
});

app.get("/canijoin", (req, res) => {
  res.send({"game_started": game_started, "players": players});
});



io.on('connection', (socket) => { //when client connects, socket object is created, and its passed to the callback
    
    console.log('socket '+socket.id+' connected');
    connectedIds.push(socket.id)

    //add player to players dictionary
    players[socket.id] = {
        id: socket.id,
        ready: false,
        showdeck: false,
        deck: [],
    }
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
      const index = connectedIds.indexOf(socket.id);
      if (index > -1) {
        connectedIds.splice(index, 1);
      }
      console.log("disconnect. connectedIds to send: "+connectedIds)
      io.emit('list of connected ids', connectedIds)
      //remove player from players dictionary
      delete players[socket.id]
      io.emit('players', players)
    });

    console.log("connectedIds to send: "+connectedIds)
    io.emit('list of connected ids', connectedIds)
    io.emit('players', players)
    io.emit('all players ready', 'Waiting On Players...')

    socket.on('ready from client', (ready_status) => {
        players[socket.id].ready = ready_status
        io.emit('players', players)
        console.log("checking if all players are ready")
        if(checkIfAllPlayersAreReady() && checkIfThereAreEnoughPlayers()){
          console.log("all players are ready")
          io.emit('all players ready', 'Start Game')
        }
        else{
          console.log("not all players are ready")
          io.emit('all players ready', 'Waiting On Players')
        }
    })

    socket.on('pressed start',  (socket_id) => {
      newDeck()
      game_started = true
      console.log("start game button pressed by user:", socket_id)
      io.emit("show cardfield", true)

      for(const player in players){
        let hand = new Queue
        let reciever = String(players[player]["id"])
        for (let i = 0; i < 7; i++) {
            hand.enqueue(shuffledDeck_Queue.dequeue());
        }
        players[player]["deck"] = hand
        // io.emit(reciever, hand) - alt: send the hand via the socket
        console.log(hand, reciever)

      }
    })
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});