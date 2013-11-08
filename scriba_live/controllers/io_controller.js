// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
var socketio = require('socket.io');

module.exports.listen = function(server, db) {
  io = socketio.listen(server);
  io.on('connection', function(socket) {

    socket.on('room', function(room) {
      socket.join(room);

      socket.on('page', function(data) {
        if (data.type == 'create') {
          db.Page.create({
            page_index:  data.object.page_index,
          }).success(function(page) {

            db.Text.create({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                value:  data.object.text

              }).success(function(text) {

                page.addText(text);

                // respond to initiating user and foward to remaining users
                socket.emit('page', {
                  success: true,
                  type: 'affirmCreate',
                  page: page,
                  page_id: page.id
                });
                socket.broadcast.to(room).emit('page', {
                  success: true,
                  type: 'create',
                  page: page,
                  page_id: page.id
                });
              });
          }).error(function(error) {
            // forget about it
          });
        } // end create page
        else if (data.type == 'destroy') {
          db.Page.find(data.object.id).success(function(page) {
            // if page exists
            if (page) {
              // attempt to destroy page
              page.destroy().success(function(page) {

                var initiator_message = {
                  success: true,
                  type: 'affirmDestroy',
                  page: page
                }
                var broadcast_message = {
                  success: true,
                  type: 'destroy',
                  page: page
                }

                // respond to initiating user and foward to remaining users
                socket.emit('page', initiator_message);
                socket.broadcast.to(room).emit('page', broadcast_message);

              }); // end of page.destroy()
            }
          }); // end of db.Page.find
        } // end destroy page

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Page.findAll().success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('page', {
                success: true,
                type: 'create',
                page: sq_objs[idx]
              }); // end of socket.emit
            }
            socket.emit('page', {
              success: true,
              type: 'initPages'
            });
          }); // end of db.Page.findAll
        }

        else {console.log(page, data);};

      }); // end of socket.on page

      socket.on('text', function(data) {
        /*if (data.type == 'create') {

          db.Page.find(data.object.page_id).success(function(page){
            if (page) {
              db.Text.create({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                value:  data.object.text

              }).success(function(text) {

                page.addTexts(text);

                var initiator_message = {
                  success: true,
                  type: 'affirmCreate',
                  text: text
                }
                var broadcast_message = {
                  success: true,
                  type: 'create',
                  text: text
                }

                // respond to initiating user and foward to remaining users
                socket.emit('text', initiator_message);
                socket.broadcast.to(room).emit('text', broadcast_message);

              }).error(function(error) {
                // forget about it
              });
            }
            else {

            }
          });
        } // end create text

        else */if (data.type == 'update') {
          db.Text.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // attempt to update text
              sq_obj.updateAttributes({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                value:  data.object.text

              }).success(function(sq_obj) {

                var initiator_message = {
                  success: true,
                  type: 'affirmUpdate',
                  text: sq_obj
                }
                var broadcast_message = {
                  success: true,
                  type: 'update',
                  text: sq_obj
               }

                // respond to initiating user and foward to remaining users
                socket.emit('text', initiator_message);
                socket.broadcast.to(room).emit('text', broadcast_message);

              }); // end of sq_obj.updateAttributes()
            }
          }); // end of db.Text.find
        } // end update text

        /*else if (data.type == 'destroy') {
          db.Text.find(data.object.id).success(function(text) {
            // if text exists
            if (text) {
              // attempt to destroy text
              text.destroy().success(function(text) {

                var initiator_message = {
                  success: true,
                  type: 'affirmDestroy',
                  text: text
                }
                var broadcast_message = {
                  success: true,
                  type: 'destroy',
                  text: text
                }

                // respond to initiating user and foward to remaining users
                socket.emit('text', initiator_message);
                socket.broadcast.to(room).emit('text', broadcast_message);

              }); // end of text.destroy()
            }
          }); // end of db.Text.find
        }*/ // end destroy text

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Text.findAll().success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('text', {
                success: true,
                type: 'create',
                text: sq_objs[idx]
              }); // end of socket.emit
            }
          }); // end of db.Text.findAll
        }

        else {};

      }); // end of socket.on text

      socket.on('rect', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(page){
            if (page) {
              db.Rect.create({
                page_id: data.object.page_id,
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                x_size: data.object.width,
                y_size: data.object.height
              }).success(function(rect) {

                page.addRect(rect);

                var initiator_message = {
                  success: true,
                  type: 'affirmCreate',
                  rect: rect,
                  page_id: page.id
                }
                var broadcast_message = {
                  success: true,
                  type: 'create',
                  rect: rect,
                  page_id: page.id
                }

                // respond to initiating user and foward to remaining users
                socket.emit('rect', initiator_message);
                socket.broadcast.to(room).emit('rect', broadcast_message);

              }).error(function(error) {
                // forget about it
              });
            }
            else {

            }
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
        } // end destroy rect

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Rect.findAll().success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('rect', {
                success: true,
                type: 'create',
                rect: sq_objs[idx]
              }); // end of socket.emit
            }
          }); // end of db.Rect.findAll
        }

        else {console.log(rect, data);};

      }); // end of socket.on rect


      socket.on('oval', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(page){
            if (page) {
              db.Oval.create({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                x_size: data.object.width,
                y_size: data.object.height
              }).success(function(oval) {


                page.addOval(oval);

                var initiator_message = {
                  success: true,
                  type: 'affirmCreate',
                  oval: oval,
                  page_id: page.id
                }
                var broadcast_message = {
                  success: true,
                  type: 'create',
                  oval: oval,
                  page_id: page.id
                }

                // respond to initiating user and foward to remaining users
                socket.emit('oval', initiator_message);
                socket.broadcast.to(room).emit('oval', broadcast_message);

              }).error(function(error) {
                // forget about it
              });
            }
            else {

            }

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

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Oval.findAll().success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('oval', {
                success: true,
                type: 'create',
                oval: sq_objs[idx]
              }); // end of socket.emit
            }
          }); // end of db.Oval.findAll
        }

        else {};

      }); // end of socket.on oval


      socket.on('path', function(data) {
        if (data.type == 'create') {

          db.Page.find(data.object.page_id).success(function(page){
            if (page) {
              db.Path.create({
                x_pos:  data.object.x_pos,
                y_pos:  data.object.y_pos,
                value:  data.object.path

              }).success(function(path) {

                page.addPath(path);

                var initiator_message = {
                  success: true,
                  type: 'affirmCreate',
                  path: path,
                  page_id: page.id
                }
                var broadcast_message = {
                  success: true,
                  type: 'create',
                  path: path,
                  page_id: page.id
                }

                // respond to initiating user and foward to remaining users
                socket.emit('path', initiator_message);
                socket.broadcast.to(room).emit('path', broadcast_message);

              }).error(function(error) {
                // forget about it
              });
            }
            else {

            }
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

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Path.findAll().success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('path', {
                success: true,
                type: 'create',
                path: sq_objs[idx]
              }); // end of socket.emit
            }
          }); // end of db.Path.findAll
        }

        else {};

      }); // end of socket.on path

    });//end of socket.join  room


  }); // end of io.on
  return io;
}
