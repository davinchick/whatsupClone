const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecip = recipients.filter(r => r !== recipient)
            newRecip.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {recipients : newRecip, sender: id, text})
        })
    })
})