module.exports.chatSockets=function(socketServer)
{
    let io=require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved:',socket.id);

        socket.on('disconnect',function(){
            console.log('socket:disconnected!');
        });

        // socket.on('join_room',function(data){
        //       console.log('joining recieved::',data);
              
        //       socket.join(data.chatroom);
              
        //       io.in(data.chatroom).emit('user_joined',data);
        // });
        socket.on('send_messege',function(data){
            console.log('send messege recieved',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('received_messege',data);
        });
    });
}