// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
var socketio = require('socket.io');

module.exports.listen = function(server){
    io = socketio.listen(server);

    io.on('connection', function(socket){

      // Add new events here. You can nest these events.
      socket.emit('hello2', { hello: 'world' });
      socket.on('hello1', function(data) {
        console.log(data);
      });

    });

    return io;
}