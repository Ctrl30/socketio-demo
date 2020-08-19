const express = require('express');
const socket = require('socket.io');
const path  = require('path');

const app = express();
const server = app.listen(4000,()=>{
    console.log('services is running in 40000')
})

// 让服务器识别静态文件
app.use(express.static('public'))

const io = socket(server);

io.on('connection',(socket)=>{
    console.log('socket 连接了',socket.id);

    // 获取从客户端发送的数据(chat)
    socket.on('chat',(data)=>{
        console.log('接受到的数据',data)
        io.sockets.emit('chat',data);
    })

    // 获取从客户端发送的数据(typing)
    socket.on('typing',(data)=>{
        console.log('typing',data)
        socket.broadcast.emit('typing',data)
        // io.sockets.emit('typing',data)
    }) 
    // 获取从客户端发送的数据(blur)
    socket.on('blur',()=>{
        socket.broadcast.emit('blur')
        // io.sockets.emit('typing',data)
    }) 

})