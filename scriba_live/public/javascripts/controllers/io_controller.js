SL.IoController = Em.Controller.extend({
  // controller variables
  socket: null,


  // connect to server
  createConnection: function(){
    SL.editorController.startDemo();

    var socket = io.connect();
    SL.ioController.set('socket', socket);

    //create room "ID" and emit Join room message
    var room = "Scriba";
    socket.emit('room', room);
    //now socket is in room

    // register handlers to receive events from server
    //rectangle event
    socket.on('rect', SL.ioController.rectEmitHandler);
    //oval event
    socket.on('oval', SL.ioController.ovalEmitHandler);
    //path event
    socket.on('path', SL.ioController.pathEmitHandler);
  },


  // push create/edit/destroy rect actions to server
  pushRectCreate: function(rect) {
    var data = {
      type: 'create',
      object: {
        x_pos:  rect.get('x_pos'),
        y_pos:  rect.get('y_pos'),
        width:  rect.get('width'),
        height: rect.get('height')
      }
    }

    SL.ioController.get('socket').emit('rect', data);
  },

  pushRectUpdate: function(em_obj) {
    var data = {
      type: 'update',
      object: {
        id: em_obj.get('id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        width:  em_obj.get('width'),
        height: em_obj.get('height')
      }
    }

    SL.ioController.get('socket').emit('rect', data);
  },

  pushRectDestroy: function(rect) {
    var data = {
      type: 'destroy',
      object: {
        id: rect.get('id')
      }
    }

    console.log(data);

    SL.ioController.get('socket').emit('rect', data);
  },


  // push create/edit/destroy oval actions to server
  pushOvalCreate: function(oval) {
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

    SL.ioController.get('socket').emit('oval', data);
  },

  pushOvalUpdate: function(em_obj) {
    var data = {
      type: 'update',
      object: {
        id: em_obj.get('id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        width:  em_obj.get('width'),
        height: em_obj.get('height')
      }
    }

    SL.ioController.get('socket').emit('oval', data);
  },

  pushOvalDestroy: function(oval) {
    var data = {
      type: 'destroy',
      object: {
        id: oval.get('id')
      }
    }

    console.log(data);

    SL.ioController.get('socket').emit('oval', data);
  },


  // push create/edit/destroy path actions to server
  pushPathCreate: function(path) {
    var data = {
      type: 'create',
      object: {
        x_pos:  path.get('x_pos'),
        y_pos:  path.get('y_pos'),
        path:   path.get('object').node.attributes.d.value
      }
    }

    SL.ioController.get('socket').emit('path', data);
  },

  pushPathUpdate: function(em_obj) {
    var data = {
      type: 'update',
      object: {
        id: em_obj.get('id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        path:   em_obj.get('object').node.attributes.d.value
      }
    }

    console.log(data);
    SL.ioController.get('socket').emit('path', data);
  },

  pushPathDestroy: function(path) {
    var data = {
      type: 'destroy',
      object: {
        id: path.get('id')
      }
    }

    console.log(data);

    SL.ioController.get('socket').emit('path', data);
  },


  // recieve create/edit/destroy rect actions from server
  rectEmitHandler: function(message) {
    console.log(message);

    // We told server of new object, server responding with new id
    if (message.type == 'affirmCreate') {
      var rect = SL.editorController.get('rects').findBy('id', 0);
      rect.set('id', message.rect.id);
    }
    // Server telling us to add an object
    else if (message.type == 'create') {
      if (SL.editorController.get('rects').findBy('id', message.rect.id)) {
        console.error("Error: rect id:%i already exists locally!", message.rect.id);
      }
      else {
        var rg_page = SL.editorController.get('pages').objectAt(0);
        var rg_rect = SL.editorController.newRaphRect(rg_page,
          message.rect.x_pos,
          message.rect.y_pos,
          message.rect.x_size,
          message.rect.y_size
        );
        var em_rect = SL.Rect.create({
          id: message.rect.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos: message.rect.x_pos,
          y_pos: message.rect.y_pos,
          width: message.rect.x_size,
          height: message.rect.y_size,
          object: rg_rect
        });
        SL.editorController.get('rects').pushObject(em_rect);
      }
    }
    // We told server to update object
    else if (message.type == 'affirmUpdate') {
    }
    // Server telling us to update an object
    else if (message.type == 'update') {
      em_obj = SL.editorController.get('rects').findBy('id', message.rect.id);
      if (!em_obj) {
        console.error("Error: rect id:%i does not exists locally!", message.rect.id);
      }
      else {
        em_obj.object.attr({
          x:      message.rect.x_pos,
          y:      message.rect.y_pos,
          width:  message.rect.x_size,
          height: message.rect.y_size
        });
        em_obj.update('local');
      }
    }
    else if (message.type == 'affirmDestroy') {
//      console.log(message); duplicated above
    }
    else if (message.type == 'destroy') {
      var em_obj = SL.editorController.get('rects').findBy('id', message.rect.id);
      SL.editorController.get('rects').removeObject(em_obj);
      em_obj.remove('local');
    }
  },


  // recieve create/edit/destroy oval actions from server
  ovalEmitHandler: function(message) {
    console.log(message);

    if (message.type == 'affirmCreate') {
      var oval = SL.editorController.get('ovals').findBy('id', 0);
      oval.set('id', message.oval.id);
    }
    else if (message.type == 'create') {
      if (SL.editorController.get('ovals').findBy('id', message.oval.id)) {
        console.error("Error: oval id:%i already exists locally!", message.oval.id);
      }
      else {
        var rg_page = SL.editorController.get('pages').objectAt(0);
        var rg_oval = SL.editorController.newRaphOval(rg_page,
          message.oval.x_pos,
          message.oval.y_pos,
          message.oval.x_size,
          message.oval.y_size
        );
        var em_oval = SL.Oval.create({
          id: message.oval.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos:  message.oval.x_pos,
          y_pos:  message.oval.y_pos,
          width:  message.oval.x_size,
          height: message.oval.y_size,
          object: rg_oval
        });
        SL.editorController.get('ovals').pushObject(em_oval);
      }
    }
    // We told server to update object
    else if (message.type == 'affirmUpdate') {
    }
    // Server telling us to update an object
    else if (message.type == 'update') {
      em_obj = SL.editorController.get('ovals').findBy('id', message.oval.id);
      if (!em_obj) {
        console.error("Error: oval id:%i does not exists locally!", message.oval.id);
      }
      else {
        em_obj.object.attr({
          cx: message.oval.x_pos,
          cy: message.oval.y_pos,
          rx: message.oval.x_size,
          ry: message.oval.y_size
        });
        em_obj.update('local');
      }
    }
    else if (message.type == "affirmDestroy") {
//      console.log(message); duplicated above
    }
    else if (message.type == "destroy") {
      var em_obj = SL.editorController.get('ovals').findBy('id', message.oval.id);
      SL.editorController.get('ovals').removeObject(em_obj);
      em_obj.remove('local');
    }
  },


  // recieve create/edit/destroy path actions from server
  pathEmitHandler: function(message) {
    console.log(message);

    if (message.type == "affirmCreate") {
      var path = SL.editorController.get('paths').findBy('id', 0);
      path.set('id', message.path.id);
    }
    else if (message.type == "create") {
      if (SL.editorController.get('paths').findBy('id', message.path.id)) {
        console.error("Error: path id:%i already exists locally!", message.path.id);
      }
      else {
        var rg_page = SL.editorController.get('pages').objectAt(0);
        var rg_path = SL.editorController.newRaphPath(rg_page, message.path.value);
        var em_path = SL.Path.create({
          id: message.path.id,
          page_id: 0,
          note_id: 0,
          user_id: 0,
          x_pos: message.path.x_pos,
          y_pos: message.path.y_pos,
          path:  message.path.value,
          object: rg_path
        });
        rg_path.transform("T"+(em_path.x_pos)+","+(em_path.y_pos));
        SL.editorController.get('paths').pushObject(em_path);
      }
    }
    // We told server to update object
    else if (message.type == 'affirmUpdate') {
    }
    // Server telling us to update an object
    else if (message.type == 'update') {
      em_obj = SL.editorController.get('paths').findBy('id', message.path.id);
      if (!em_obj) {
        console.error("Error: path id:%i does not exists locally!", message.path.id);
      }
      else {
        em_obj.set('x_pos', message.path.x_pos);
        em_obj.set('y_pos', message.path.y_pos);
        em_obj.set('path', message.path.value);
        em_obj.object.transform("T"+(em_obj.x_pos)+","+(em_obj.y_pos));
      }
    }
    else if (message.type == "affirmDestroy") {
//      console.log(message); duplicated above
    }
    else if (message.type == "destroy") {
      var em_obj = SL.editorController.get('paths').findBy('id', message.path.id);
      SL.editorController.get('paths').removeObject(em_obj);
      em_obj.remove('local');
    }
  },


  // helpers
  someHelper: function() {
    var socket = SL.ioController.get('socket');
  }
});
