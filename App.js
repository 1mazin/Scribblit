const express=require('express');  
const socket=require('socket.io');
let port=3000
const app=express(); //Initialized and server ready

app.use(express.static("public"))
let server=app.listen(port,()=>{
    console.log('listening on port')
})

let io=socket(server)
io.on("connection", (socket) => {
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawstroke", (data) => {
        io.sockets.emit("drawstroke", data);
    })
    socket.on("undoRedo", (data) => {
        io.sockets.emit("undoRedo", data);
    })
})