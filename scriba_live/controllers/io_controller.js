// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
var socketio = require('socket.io');

module.exports.listen = function(server, db) {
  io = socketio.listen(server);
  io.on('connection', function(socket) {

    socket.on('room', function(room) {
      socket.join(room);

      socket.on('rect', function(data) {
        if (data.type == 'create') {
          db.Rect.create({
            x_pos:  data.object.x_pos,
            y_pos:  data.object.y_pos,
            x_size: data.object.width,
            y_size: data.object.height
          }).success(function(rect) {

            var initiator_message = {
              success: true,
              type: 'affirmCreate',
              rect: rect
            }
            var broadcast_message = {
              success: true,
              type: 'create',
              rect: rect
            }

            // respond to initiating user and foward to remaining users
            socket.emit('rect', initiator_message);
            socket.broadcast.to(room).emit('rect', broadcast_message);

          }).error(function(error) {
            // forget about it
          });
        } // end create rect

        else if (data.type == 'update') {
          db.Rect.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // attempt to update rect
              sq_obj.updateAttributes({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                x_size: data.object.width,
                y_size: data.object.height
              }).success(function(sq_obj) {

                var initiator_message = {
                  success: true,
                  type: 'affirmUpdate',
                  rect: sq_obj
                }
                var broadcast_message = {
                  success: true,
                  type: 'update',
                  rect: sq_obj
                }

                // respond to initiating user and foward to remaining users
                socket.emit('rect', initiator_message);
                socket.broadcast.to(room).emit('rect', broadcast_message);

              }); // end of sq_obj.updateAttributes()
            }
          }); // end of db.Rect.find
        } // end update rect

        else if (data.type == 'destroy') {
          db.Rect.find(data.object.id).success(function(rect) {
            // if rect exists
            if (rect) {
              // attempt to destroy rect
              rect.destroy().success(function(rect) {

                var initiator_message = {
                  success: true,
                  type: 'affirmDestroy',
                  rect: rect
                }
                var broadcast_message = {
                  success: true,
                  type: 'destroy',
                  rect: rect
                }

                // respond to initiating user and foward to remaining users
                socket.emit('rect', initiator_message);
                socket.broadcast.to(room).emit('rect', broadcast_message);

              }); // end of rect.destroy()
            }
          }); // end of db.Rect.find
        } // end create rect

        else {console.log(rect, data);};

      }); // end of socket.on rect


      socket.on('oval', function(data) {
        if (data.type == 'create') {
          db.Oval.create({
            x_pos:  data.object.x_pos,
            y_pos:  data.object.y_pos,
            x_size: data.object.width,
            y_size: data.object.height
          }).success(function(oval) {

            var initiator_message = {
              success: true,
              type: 'affirmCreate',
              oval: oval
              }
            var broadcast_message = {
              success: true,
              type: 'create',
              oval: oval
            }

            // respond to initiating user and foward to remaining users
            socket.emit('oval', initiator_message);
            socket.broadcast.to(room).emit('oval', broadcast_message);

          }).error(function(error) {
            // forget about it
          });
        } // end create oval

        else if (data.type == 'update') {
          db.Oval.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // attempt to update oval
              sq_obj.updateAttributes({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                x_size: data.object.width,
                y_size: data.object.height
              }).success(function(sq_obj) {

                var initiator_message = {
                  success: true,
                  type: 'affirmUpdate',
                  oval: sq_obj
                }
                var broadcast_message = {
                  success: true,
                  type: 'update',
                  oval: sq_obj
                }

                // respond to initiating user and foward to remaining users
                socket.emit('oval', initiator_message);
                socket.broadcast.to(room).emit('oval', broadcast_message);

              }); // end of sq_obj.updateAttributes()
            }
          }); // end of db.Rect.find
        } // end update oval

        else if (data.type == 'destroy') {
          db.Oval.find(data.object.id).success(function(oval) {
            // if oval exists
            if (oval) {
              // attempt to destroy oval
              oval.destroy().success(function(oval) {

                var initiator_message = {
                  success: true,
                  type: 'affirmDestroy',
                  oval: oval
                }
                var broadcast_message = {
                  success: true,
                  type: 'destroy',
                  oval: oval
                }

                // respond to initiating user and foward to remaining users
                socket.emit('oval', initiator_message);
                socket.broadcast.to(room).emit('oval', broadcast_message);

              }); // end of oval.destroy()
            }
          }); // end of db.Oval.find
        } // end destroy oval

        else {};

      }); // end of socket.on oval


      socket.on('path', function(data) {
        if (data.type == 'create') {
          db.Path.create({
            x_pos:  data.object.x_pos,
            y_pos:  data.object.y_pos,
            value:  data.object.path

          }).success(function(path) {

            var initiator_message = {
              success: true,
              type: 'affirmCreate',
              path: path
            }
            var broadcast_message = {
              success: true,
              type: 'create',
              path: path
            }

            // respond to initiating user and foward to remaining users
            socket.emit('path', initiator_message);
            socket.broadcast.to(room).emit('path', broadcast_message);

          }).error(function(error) {
            // forget about it
          });
        } // end create path

        else if (data.type == 'update') {
          db.Path.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // attempt to update path
              sq_obj.updateAttributes({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                value:  data.object.path

              }).success(function(sq_obj) {

                var initiator_message = {
                  success: true,
                  type: 'affirmUpdate',
                  path: sq_obj
                }
                var broadcast_message = {
                  success: true,
                  type: 'update',
                  path: sq_obj
                }

                // respond to initiating user and foward to remaining users
                socket.emit('path', initiator_message);
                socket.broadcast.to(room).emit('path', broadcast_message);

              }); // end of sq_obj.updateAttributes()
            }
          }); // end of db.Path.find
        } // end update path

        else if (data.type == 'destroy') {
          db.Path.find(data.object.id).success(function(path) {
            // if path exists
            if (path) {
              // attempt to destroy path
              path.destroy().success(function(path) {

                var initiator_message = {
                  success: true,
                  type: 'affirmDestroy',
                  path: path
                }
                var broadcast_message = {
                  success: true,
                  type: 'destroy',
                  path: path
                }

                // respond to initiating user and foward to remaining users
                socket.emit('path', initiator_message);
                socket.broadcast.to(room).emit('path', broadcast_message);

              }); // end of path.destroy()
            }
          }); // end of db.Path.find
        } // end destroy path

        else {};

    });//end of socket.join  room

      }); // end of socket.on path


    }); // end of io.on
    return io;
}
