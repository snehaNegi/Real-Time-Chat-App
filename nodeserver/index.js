//this is the node server which will handle socket.io connections

const io=require('socket.io')(8080,{
    cors: {
      origin: '*',
    }
  }) //can use any port

const users={};

//io.on is a socket.io instance and it can listen to many socket connections, ex sneha connected, ayush connected
//socket.on work on a particular connection event for ex, below its working on 'user-joined' event
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
       socket.broadcast.emit('left', users[socket.id]);
       delete users[socket.id];
   });
})