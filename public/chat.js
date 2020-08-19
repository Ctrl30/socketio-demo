// 实现和服务端的连接
const socket = io.connect('http://localhost:4000')

// 获取节点
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      chatwindow = document.getElementById('chat-window'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

      btn.addEventListener('click',()=>{
        
          socket.emit('chat',{
              message:message.value,
              handle:handle.value
          })
        
      })
      message.addEventListener('focus',()=>{
          console.log('aaaaaaaaaaaaaaa')
          socket.emit('typing',handle.value)
      })
      message.addEventListener('blur',()=>{
        socket.emit('blur')
          console.log('ccccccccccccccccc')
        // feedback.innerHTML = ''
      })
// 获取从服务器传过来的数据
socket.on('chat',(data)=>{
    
    const {handle,message} = data;
    output.innerHTML+=`<p><strong>${handle}</strong>:${message}</p>`
    const cscrollHeight = chatwindow.scrollHeight;
    chatwindow.scrollTop = cscrollHeight+30;
})
// 获取从服务器广播的数据
socket.on('typing',(data)=>{
    feedback.innerHTML = `<p><em>${data}</em>正在输入.......</p>`
    const cscrollHeight = chatwindow.scrollHeight;
    chatwindow.scrollTop = cscrollHeight+30;
})
// 获取从服务器广播的数据
socket.on('blur',()=>{
    feedback.innerHTML = ''
})