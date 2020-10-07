module.exports = function (socket, io) {
    console.log('new websocket connection')
    //user welcome chat 
    socket.emit("message", "Welcome to socketio")

    //broadcast when user connect
    // socket.broadcast.emit("message", "A user has join to the chat")

    //send chat
    socket.on('sendMessage', (msg)=>{
        io.to('room').emit('message', {data : msg})
    })

    //subscribe room chat
    socket.on('joinRoom', (data)=>{
        socket.join('room')        
        io.to('room').emit('message', data)
    })

    //leave room
    socket.on('leave', ()=>{
        console.log('leave')
        socket.leave('room')
    })
    
    //run when client disconnect
    socket.emit("disconnect",()=>{
        io.emit("A user has left chat")
    })
}
