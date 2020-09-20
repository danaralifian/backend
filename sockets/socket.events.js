module.exports = function (socket) {
    console.log('new websocket connection')
    //user welcome chat 
    socket.emit("message", "Welcome to socketio")

    //broadcast when user connect
    socket.broadcast.emit("message", "A user has join to the chat")

    //send chat
    socket.on('sendMessage', (msg)=>{
        console.log(msg)
    })

    //run when client disconnect
    socket.emit("disconnect",()=>{
        io.emit("A user has left chat")
    })
}
