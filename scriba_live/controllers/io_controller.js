// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
var socketio = require('socket.io');

module.exports.listen = function(server, db){
    io = socketio.listen(server);


    io.on('connection', function(socket){

    socket.on('rect', function(data) {

      if (data.type == 'create') {

        // save to database?'
        db.Rect.create({
          x_pos:  data.object.x_pos,
          y_pos:  data.object.y_pos,
          x_size: data.object.width,
          y_size: data.object.height
        }).success(function(rect) {

          var creator_message = {
            success: true,
            type: 'affirmCreate',
            rect: rect
          }
          var broadcast_message = {
            success: true,
            type: 'create',
            rect: rect
          }

          // return to single user
          socket.emit('rect', creator_message);

          // return to all users
          socket.broadcast.emit('rect', broadcast_message);

        }).error(function(error){
          // forget about it
        });
      }
      else if(data.type == 'destroy') {

        db.Rect.find(data.object.id).success(function(rect) {

          // if rect exists
            if (rect) {

            // attempt to destroy rect
                rect.destroy().success(function(rect) {

            var destroyer_message = {
              success: true,
              type: 'affirmDestroy',
              rect: rect
            }

            var broadcast_message = {
              success: true,
              type: 'destroy',
              rect: rect
            }

            // return to single user
            socket.emit('rect', destroyer_message);

            // return to all users
            socket.broadcast.emit('rect', broadcast_message);

            });
          }

        });


      }

      else if(data.type == 'update') {

      }
      else{};

    });//end of socket.on rect

    socket.on('oval', function(data){

      if(data.type == 'create') {

        db.Oval.create({

          x_pos:  data.object.x_pos,
          y_pos:  data.object.y_pos,
          x_size: data.object.width,
          y_size: data.object.height

        }).success(function(oval) {

        var creator_message = {

            success: true,
            type: 'affirmCreate',
            oval: oval
            }
        var broadcast_message = {

            success: true,
            type: 'create',
            oval: oval
          }

        // return to single user
        socket.emit('oval', creator_message);

        // return to all users
        socket.broadcast.emit('oval', broadcast_message);

        }).error(function(error){
        // forget about it
        });

      }//end if data.type == create

      else if(data.type == 'destroy') {

          db.Oval.find(data.object.id).success(function(oval) {

            // if oval exists
            if (oval) {

              // attempt to destroy
              oval.destroy().success(function(oval) {

              var destroyer_message = {
                success: true,
                type: 'affirmDestroy',
                oval: oval
              }

              var broadcast_message = {
                success: true,
                type: 'destroy',
                oval: oval
              }

              // return to single user
              socket.emit('oval', destroyer_message);

              // return to all users
              //socket.broadcast.emit('oval', broadcast_message);

              });
            }

          });


        }

        else if(data.type == 'update') {

        }
        else{};


    });//end if socket.on oval

    });//end of io.on

    return io;
}