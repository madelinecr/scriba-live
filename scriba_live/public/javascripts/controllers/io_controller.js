SL.IoController = Em.Controller.extend({
  // controller variables
  socket: null,

  // event listeners

  createConnection: function(){
    SL.editorController.startDemo();

    var socket = io.connect();
    SL.ioController.set('socket', socket);

    //rectangle event
    socket.on('rect', SL.ioController.rectEmitHandler);
    //oval event
    socket.on('oval', SL.ioController.ovalEmitHandler);
    //path event
    socket.on('path', SL.ioController.pathEmitHandler);
  },

  // push create/edit/destroy object functions to server
  pushRectCreate: function(rect) {
    var socket = SL.ioController.get('socket');

    var data = {
      type: 'create',
      object: {
        x_pos:  rect.get('x_pos'),
        y_pos:  rect.get('y_pos'),
        width:  rect.get('width'),
        height: rect.get('height')
      }
    }

    socket.emit('rect', data);

  },

  pushRectDestroy: function(rect) {
    var socket = SL.ioController.get('socket');

    var data = {
      type: 'destroy',
      object: {
          id: rect.get('id')
      }
    }

    console.log(data);

    socket.emit('rect', data);
  },



    // push create/edit/destroy oval functions to server
    pushOvalCreate: function(oval) {
      var socket = SL.ioController.get('socket');

      var data = {
        type: 'create',
        object: {
          x_pos:  oval.get('x_pos'),
          y_pos:  oval.get('y_pos'),
          width:  oval.get('width'),
          height: oval.get('height')
        }
      }

      console.log(data);

      socket.emit('oval', data);

    },

    pushOvalDestroy: function(oval) {
      var socket = SL.ioController.get('socket');

      var data = {
        type: 'destroy',
        object: {
            id: oval.get('id')
        }
        }

      console.log(data);

      socket.emit('oval', data);
  },

  pushPathCreate: function(path) {
    var socket = SL.ioController.get('socket');


    var data = {
      type: 'create',
      object: {
        x_pos:  path.get('x_pos'),
        y_pos:  path.get('y_pos'),
        path:  path.get('object').node.attributes.d.value,
      }
    }

    akharazia5 = path;

    socket.emit('path', data);

  },

  pushPathDestroy: function(path) {
    var socket = SL.ioController.get('socket');

    var data = {
      type: 'destroy',
      object: {
          id: path.get('id')
      }
    }

    console.log(data);

    socket.emit('path', data);
  },


    // recieve create/edit/destroy object functions from server
  rectEmitHandler: function(message) {
    console.log(message);

    if (message.type == "affirmCreate") {
      var rect = SL.editorController.get('rects').findBy('id', 0);
      rect.set('id', message.rect.id);
    }
    else if (message.type == "create") {
      var rect = SL.editorController.get('rects').findBy('id', message.rect.id);

      if (!rect) {
        var em_rect = SL.Rect.create({
          id: message.rect.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos: message.rect.x_pos,
          y_pos: message.rect.y_pos,
          width: message.rect.x_size,
          height: message.rect.y_size,
        });

        SL.editorController.createRect(em_rect);
      }
    }
    else if (message.type == "affirmDestroy") {
      console.log(message);
    }
    else if (message.type == "destroy") {

    }
  },

  // recieve create/edit/destroy oval functions from server
  ovalEmitHandler: function(message) {
    console.log(message);

    if (message.type == "affirmCreate") {
      var oval = SL.editorController.get('ovals').findBy('id', 0);
      oval.set('id', message.oval.id);
    }
    else if (message.type == "create") {
      var oval = SL.editorController.get('ovals').findBy('id', message.oval.id);

      if (!oval) {
        var em_oval = SL.Oval.create({
          id: message.oval.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos: message.oval.x_pos,
          y_pos: message.oval.y_pos,
          width: message.oval.x_size,
          height: message.oval.y_size,
        });

        SL.editorController.createOval(em_oval);
      }
    }

    else if (message.type == "affirmDestroy") {
      console.log(message);
    }
    else if (message.type == "destroy") {

    }
  },

  pathEmitHandler: function(message) {
    console.log(message);

    if (message.type == "affirmCreate") {
      var path = SL.editorController.get('paths').findBy('id', 0);
      path.set('id', message.path.id);
    }
    else if (message.type == "create") {
      var path = SL.editorController.get('paths').findBy('id', message.path.id);

      if (!path) {
        var em_path = SL.Path.create({
          id: message.path.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos: message.path.x_pos,
          y_pos: message.path.y_pos,
          path: message.path.value,
        });

        SL.editorController.createPath(em_path);
      }
    }

    else if (message.type == "affirmDestroy") {
      console.log(message);
    }
    else if (message.type == "destroy") {

    }
  },


  // helpers
  someHelper: function() {
    var socket = SL.ioController.get('socket');
  }
});