const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

io.on("connection",(socket) => {
  console.log(socket.id);
  socket.on("stream",(image) => {
    console.log(image);
    io.sockets.emit('stream',image);
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));