// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
var socketio = require('socket.io');

module.exports.listen = function(server){
    io = socketio.listen(server);

    io.on('connection', function(socket){


      socket.on('Text', function (name, SaveObject) {
		  socket.get('Text', function(text, err)
		  var SaveObject = text;
		  //save text to db
		  }

      socket.on('Oval', function (name, SaveObject) {
		   socket.get('Oval', function(Oval, err)
		   var SaveObject = Oval;
	  	    //save Oval to db
		  }


	  socket.on('Path', function (name, SaveObject) {
		   socket.get('Path', function(Path, err)
		   var SaveObject = Path;
	        //save Path to db
		  }

	  socket.on('Rect', function (name, SaveObject) {
		   socket.get('Rect', function(Rect, err)
		   var SaveObject = Rect;
		    //save Rect to db
		  }



      });

    });

    return io;
}