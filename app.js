const app=require('express');
const socket=require('socket.io');
const randomstring=require('randomstring');

const express=app();

const server=express.listen(4000,()=>{
    console.log("server started at http://localhost:4000");
})

express.use(app.static('public'));

const io=socket(server);

//ALL player info
let players={};
//GAME VARIABLES
let choice1="",choice2="";

io.on("connection",(socket)=>{
    console.log("connection established");

    //Create Game Listener
    socket.on("createGame",(data)=>{
        const roomID=randomstring.generate({length: 4});
        socket.join(roomID);
        players[roomID]=data.name;
        socket.emit("newGame",{roomID:roomID});
    })

})