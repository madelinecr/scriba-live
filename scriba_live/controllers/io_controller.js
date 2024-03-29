// http://stackoverflow.com/questions/9709912/separating-file-server-and-socket-io-logic-in-node-js
// ** Exploit: client sends db scoped page_id.  would allow client to edit *any* page

var socketio = require('socket.io');

module.exports.listen = function(server, db, moment) {
  var FN = {
    // Map message into sequelize input object
    sqTextFromMsg: function(msg_obj) {
      return {
        value:  msg_obj.text,
        x_pos:  msg_obj.x_pos,
        y_pos:  msg_obj.y_pos
      }
    },
    sqRectFromMsg: function(msg_obj) {
      return {
        x_pos:  msg_obj.x_pos,
        y_pos:  msg_obj.y_pos,
        x_size: msg_obj.width,
        y_size: msg_obj.height,
        fill_color: msg_obj.fill_color,
        fill_alpha: msg_obj.fill_alpha,
        line_width: msg_obj.line_width,
        line_color: msg_obj.line_color
      }
    },
    sqOvalFromMsg: function(msg_obj) {
      return {
        x_pos:  msg_obj.x_pos,
        y_pos:  msg_obj.y_pos,
        x_size: msg_obj.width,
        y_size: msg_obj.height,
        fill_color: msg_obj.fill_color,
        fill_alpha: msg_obj.fill_alpha,
        line_width: msg_obj.line_width,
        line_color: msg_obj.line_color
      }
    },
    sqPathFromMsg: function(msg_obj) {
      return {
        x_pos: msg_obj.x_pos,
        y_pos: msg_obj.y_pos,
        value: msg_obj.path,
        fill_color: msg_obj.fill_color,
        fill_alpha: msg_obj.fill_alpha,
        line_width: msg_obj.line_width,
        line_color: msg_obj.line_color
      }
    }
  };

  io = socketio.listen(server);
  io.on('connection', function(socket) {

    // Search for note id
    socket.on('getNoteID', function(data) {  // , by date and by user
      db.Dino.find(data.dino_id).success(function(sq_dino) {
        db.Note.findOrCreate({dino_id: sq_dino.id, date: data.date, user_id: data.user_id}).success(function(sq_obj, is_new) {
          sq_dino.addNote(sq_obj).success(function(sq_obj) {
//            sq_user.addNote(sq_obj).success(function(sq_obj) {
              // respond to initiating user and foward to remaining users
              socket.emit('note', {success: true, type: 'noteID', note: sq_obj});
//            }); // end sq_user.add
          }); // end sq_dino.add
        });
      });
    });

    socket.on('getAllDinoNotes', function(data) {
      db.Note.findAll({where: {dino_id: data.dino_id, date: data.date}, include: [ db.User ]}).success(function(sq_objs) {
        socket.emit('getAllDinoNotes', {success: true, type: 'getDinoNotes', notes: sq_objs});
      }).error(function(error) {
        console.log("No notes available: " + data);
      });
    });

    socket.on('getDino', function(data){
      db.Dino.find(data.dino_id).success(function(sq_obj) {
        socket.emit('getDino', {success: true, type: 'getDino', dino: sq_obj});
      }).error(function(error) {
        socket.emit('getDino', {success: false, type: 'getDino', error: error});
      });
    });

    socket.on('joinNote', function(note_id) {
      socket.join(note_id);
      socket.note_id = note_id;
      socket.emit('note', {success: true, type: 'affirmjoinNote'});
    });

    socket.on('leaveNote', function() {
      console.log("left note:", socket.note_id)
      socket.leave(socket.note_id);
      socket.note_id = null;
    });

      // Handle page actions
      socket.on('page', function(data) {
        if (data.type == 'create') {
          db.Note.find(socket.note_id).success(function(sq_note){
            if (sq_note) {
              db.Page.create().success(function(sq_obj) {
                // add object to specific page
                sq_note.addPage(sq_obj).success(function(sq_obj) {
                  // respond to initiating user and foward to remaining users
                  socket.emit('page', {success: true, type: 'affirmCreate', page: sq_obj});
                  socket.broadcast.to(socket.note_id).emit('page', {success: true, type: 'create', page: sq_obj});
                }); // end sq_note.add
              }).error(function(error) {
                console.log("Fail: ", data);
              });
            }
            else {
              console.log("Note not found: ", data);
            }
          });
        } // end create page

        else if (data.type == 'destroy') {
          db.Page.find(data.object.id).success(function(sq_obj) {
            // if object exists
            if (sq_obj) {
              // destroy object
              sq_obj.destroy().success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('page', {success: true, type: 'affirmDestroy', page: sq_obj});
                socket.broadcast.to(socket.note_id).emit('page', {success: true, type: 'destroy', page: sq_obj});
              });
            }
            else {
              console.log("Page not found: ", data);
            }
          });
        } // end destroy page

        // Get pages in note
        else if (data.type == 'getAll') {
          db.Page.findAll({where: {note_id: socket.note_id}}).success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('page', {success: true, type: 'create', page: sq_objs[idx]});
            }
            // Tell client to request objects
            socket.emit('page', {success: true, type: 'initPages'});
          });
        } // end getAll page

        else {console.log("Do what: ", data);};

      }); // end of socket.on page


      // Handle text actions
      socket.on('text', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(sq_page){
            if (sq_page) {
              db.Text.create(FN.sqTextFromMsg(data.object)).success(function(sq_obj) {
                // add object to specific page
                sq_page.addText(sq_obj).success(function(sq_obj) {
                  // respond to initiating user and foward to remaining users
                  socket.emit('text', {success: true, type: 'affirmCreate', text: sq_obj});
                  socket.broadcast.to(socket.note_id).emit('text', {success: true, type: 'create', text: sq_obj});
                }); // end sq_page.add
              }).error(function(error) {
                console.log("Fail: ", data);
              });
            }
            else {
              console.log("Page not found: ", data);
            }
          });
        } // end create text

        else if (data.type == 'update') {
          db.Text.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // update object
              sq_obj.updateAttributes(FN.sqTextFromMsg(data.object)).success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('text', {success: true, type: 'affirmUpdate', text: sq_obj});
                socket.broadcast.to(socket.note_id).emit('text', {success: true, type: 'update', text: sq_obj});
              });
            }
            else {
              console.log("Text not found: ", data);
            }
          });
        } // end update text

//        else if (data.type == 'destroy') {}

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Text.findAll({where: {page_id: data.page_id}}).success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('text', {success: true, type: 'create', text: sq_objs[idx]});
            }
          });
        } // end getAll text

        else {console.log("Do what: ", data);};

      }); // end of socket.on text


      // Handle rect actions
      socket.on('rect', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(sq_page){
            if (sq_page) {
              db.Rect.create(FN.sqRectFromMsg(data.object)).success(function(sq_obj) {
                // add object to specific page
                sq_page.addRect(sq_obj).success(function(sq_obj) {
                  // respond to initiating user and foward to remaining users
                  socket.emit('rect', {success: true, type: 'affirmCreate', rect: sq_obj});
                  socket.broadcast.to(socket.note_id).emit('rect', {success: true, type: 'create', rect: sq_obj});
                }); // end sq_page.add
              }).error(function(error) {
                console.log("Fail: ", data);
              });
            }
            else {
              console.log("Page not found: ", data);
            }
          });
        } // end create rect

        else if (data.type == 'update') {
          db.Rect.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // update object
              sq_obj.updateAttributes(FN.sqRectFromMsg(data.object)).success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('rect', {success: true, type: 'affirmUpdate', rect: sq_obj});
                socket.broadcast.to(socket.note_id).emit('rect', {success: true, type: 'update', rect: sq_obj});
              });
            }
            else {
              console.log("Rect not found: ", data);
            }
          });
        } // end update rect

        else if (data.type == 'destroy') {
          db.Rect.find(data.object.id).success(function(sq_obj) {
            // if object exists
            if (sq_obj) {
              // destroy object
              sq_obj.destroy().success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('rect', {success: true, type: 'affirmDestroy', rect: sq_obj});
                socket.broadcast.to(socket.note_id).emit('rect', {success: true, type: 'destroy', rect: sq_obj});
              });
            }
            else {
              console.log("Rect not found: ", data);
            }
          });
        } // end destroy rect

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Rect.findAll({where: {page_id: data.page_id}}).success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('rect', {success: true, type: 'create', rect: sq_objs[idx]});
            }
          });
        } // end getAll rect

        else {console.log("Do what: ", data);};

      }); // end of socket.on rect


      // Handle oval actions
      socket.on('oval', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(sq_page){
            if (sq_page) {
              db.Oval.create(FN.sqOvalFromMsg(data.object)).success(function(sq_obj) {
                // add object to specific page
                sq_page.addOval(sq_obj).success(function(sq_obj) {
                  // respond to initiating user and foward to remaining users
                  socket.emit('oval', {success: true, type: 'affirmCreate', oval: sq_obj});
                  socket.broadcast.to(socket.note_id).emit('oval', {success: true, type: 'create', oval: sq_obj});
                }); // end sq_page.add
              }).error(function(error) {
                console.log("Fail: ", data);
              });
            }
            else {
              console.log("Page not found: ", data);
            }
          });
        } // end create oval

        else if (data.type == 'update') {
          db.Oval.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // update object
              sq_obj.updateAttributes(FN.sqOvalFromMsg(data.object)).success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('oval', {success: true, type: 'affirmUpdate', oval: sq_obj});
                socket.broadcast.to(socket.note_id).emit('oval', {success: true, type: 'update', oval: sq_obj});
              });
            }
            else {
              console.log("Oval not found: ", data);
            }
          });
        } // end update oval

        else if (data.type == 'destroy') {
          db.Oval.find(data.object.id).success(function(sq_obj) {
            // if object exists
            if (sq_obj) {
              // destroy object
              sq_obj.destroy().success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('oval', {success: true, type: 'affirmDestroy', oval: sq_obj});
                socket.broadcast.to(socket.note_id).emit('oval', {success: true, type: 'destroy', oval: sq_obj});
              });
            }
            else {
              console.log("Oval not found: ", data);
            }
          });
        } // end destroy oval

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Oval.findAll({where: {page_id: data.page_id}}).success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('oval', {success: true, type: 'create', oval: sq_objs[idx]});
            }
          });
        } // end getAll oval

        else {console.log("Do what: ", data);};

      }); // end of socket.on oval


      // Handle path actions
      socket.on('path', function(data) {
        if (data.type == 'create') {
          db.Page.find(data.object.page_id).success(function(sq_page){
            if (sq_page) {
              db.Path.create(FN.sqPathFromMsg(data.object)).success(function(sq_obj) {
                // add object to specific page
                sq_page.addPath(sq_obj).success(function(sq_obj) {
                  // respond to initiating user and foward to remaining users
                  socket.emit('path', {success: true, type: 'affirmCreate', path: sq_obj});
                  socket.broadcast.to(socket.note_id).emit('path', {success: true, type: 'create', path: sq_obj});
                });
              }).error(function(error) {
                console.log("Fail: ", data);
              });
            }
            else {
              console.log("Page not found: ", data);
            }
          });
        } // end create path

        else if (data.type == 'update') {
          db.Path.find(data.object.id).success(function(sq_obj) {
            // if sq_obj exists
            if (sq_obj) {
              // update object
              sq_obj.updateAttributes(FN.sqPathFromMsg(data.object)).success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('path', {success: true, type: 'affirmUpdate', path: sq_obj});
                socket.broadcast.to(socket.note_id).emit('path', {success: true, type: 'update', path: sq_obj});
              });
            }
            else {
              console.log("Path not found: ", data);
            }
          });
        } // end update path

        else if (data.type == 'destroy') {
          db.Path.find(data.object.id).success(function(sq_obj) {
            // if object exists
            if (sq_obj) {
              // destroy object
              sq_obj.destroy().success(function(sq_obj) {
                // respond to initiating user and foward to remaining users
                socket.emit('path', {success: true, type: 'affirmDestroy', path: sq_obj});
                socket.broadcast.to(socket.note_id).emit('path', {success: true, type: 'destroy', path: sq_obj});
              });
            }
            else {
              console.log("Path not found: ", data);
            }
          });
        } // end destroy path

        // Dump existing objects to client
        else if (data.type == 'getAll') {
          db.Path.findAll({where: {page_id: data.page_id}}).success(function(sq_objs) {
            // Send each object to the joining client
            for (idx in sq_objs) {
              socket.emit('path', {success: true, type: 'create', path: sq_objs[idx]});
            }
          });
        } // end getAll path

        else {console.log("Do what: ", data);};

      }); // end of socket.on path

  }); // end of io.on
  return io;
}
