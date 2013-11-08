SL.IoController = Em.Controller.extend({
  // controller variables
  socket: null,
  initialized_pages: false,


  // connect to server
  createConnection: function(){
    SL.editorController.startEditor();

    var socket = io.connect();
    SL.ioController.set('socket', socket);

    //create room "ID" and emit Join room message
    var room = "Scriba";
    socket.emit('room', room);
    //now socket is in room

    // register handlers to receive events from server
    socket.on('page', SL.ioController.pageEmitHandler);
    //rectangle event
    socket.on('rect', SL.ioController.rectEmitHandler);
    //oval event
    socket.on('oval', SL.ioController.ovalEmitHandler);
    //path event
    socket.on('path', SL.ioController.pathEmitHandler);
    //text event
    socket.on('text', SL.ioController.textEmitHandler);

    // Retrieve existing objects
    SL.ioController.get('socket').emit('page', {type: 'getAll'});
  },

  initPageObjects: function() {
    SL.ioController.get('socket').emit('rect', {type: 'getAll'});
    SL.ioController.get('socket').emit('oval', {type: 'getAll'});
    SL.ioController.get('socket').emit('path', {type: 'getAll'});
    SL.ioController.get('socket').emit('text', {type: 'getAll'});
  },

  // push create/edit/destroy page actions to server
  pushPageCreate: function(page) {
    var data = {
      type: 'create',
      object: {
        page_index: page.get('page_index')
      }
    }

    SL.ioController.get('socket').emit('page', data);
  },

  pushPageDestroy: function(page) {
    var data = {
      type: 'destroy',
      object: {
        id: page.get('id')
      }
    }

    console.log(data);

    SL.ioController.get('socket').emit('page', data);
  },

  // push create/edit/destroy rect actions to server
  pushRectCreate: function(rect) {
    var data = {
      type: 'create',
      object: {
        page_id: rect.get('page_id'),
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
        page_id: em_obj.get('page_id'),
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
        page_id: oval.get('page_id'),
        x_pos:   oval.get('x_pos'),
        y_pos:   oval.get('y_pos'),
        width:   oval.get('width'),
        height:  oval.get('height')
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
        page_id: em_obj.get('page_id'),
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
        page_id: path.get('page_id'),
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

  // push create/edit/destroy text actions to server
  pushTextCreate: function(text) {
    var data = {
      type: 'create',
      object: {
        page_id: text.get('page_id'),
        text:  "",
        x_pos:  text.get('x_pos'),
        y_pos:  text.get('y_pos')
      }
    }

    SL.ioController.get('socket').emit('text', data);
  },

  pushTextUpdate: function(em_obj) {
    var data = {
      type: 'update',
      object: {
        id: em_obj.get('id'),
        text:  em_obj.get('text'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos')
      }
    }

    SL.ioController.get('socket').emit('text', data);
  },

  pushTextDestroy: function(text) {
    var data = {
      type: 'destroy',
      object: {
        id: text.get('id')
      }
    }

    console.log(data);

    SL.ioController.get('socket').emit('text', data);
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
        var page_id = message.page_id == undefined ? message.rect.page_id : message.page_id;
        var rg_page = SL.editorController.get('pages').findBy('id', page_id);
        var rg_rect = SL.editorController.newRaphRect(rg_page,
          message.rect.x_pos,
          message.rect.y_pos,
          message.rect.x_size,
          message.rect.y_size
        );
        var em_rect = SL.Rect.create({
          id: message.rect.id,
          page_id: page_id,
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
      //console.log(message); duplicated above
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
        var page_id = message.page_id == undefined ? message.oval.page_id : message.page_id;
        var rg_page = SL.editorController.get('pages').findBy('id',page_id);
        var rg_oval = SL.editorController.newRaphOval(rg_page,
          message.oval.x_pos,
          message.oval.y_pos,
          message.oval.x_size,
          message.oval.y_size
        );
        var em_oval = SL.Oval.create({
          id: message.oval.id,
          page_id: page_id,
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
      //console.log(message); duplicated above
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
        var page_id = message.page_id == undefined ? message.path.page_id : message.page_id;
        var rg_page = SL.editorController.get('pages').findBy('id', page_id);
        var rg_path = SL.editorController.newRaphPath(rg_page, message.path.value);
        var em_path = SL.Path.create({
          id: message.path.id,
          page_id: page_id,
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
      //console.log(message); duplicated above
    }
    else if (message.type == "destroy") {
      var em_obj = SL.editorController.get('paths').findBy('id', message.path.id);
      SL.editorController.get('paths').removeObject(em_obj);
      em_obj.remove('local');
    }
  },

  // recieve create/edit/destroy page actions from server
  pageEmitHandler: function(message) {
    console.log(message);

    // We told server of new object, server responding with new id
    if (message.type == 'initPages') {
      // if there are pages, init
      if (SL.editorController.get('pages').get('length')) {
        console.log("length");
        SL.ioController.initPageObjects();
      }
      // else create a new page & save to server
      else {
        console.log("empty");
        SL.editorController.newPage('editor-canvases', 600, 600, true, 0);
      }
    }
    else if (message.type == 'affirmCreate') {
      var page = SL.editorController.get('pages').findBy('id', 0);
      var text = SL.editorController.get('texts').findBy('page_id', 0);
      page.set('id', message.page.id);
      text.set('page_id', message.page.id);
      // check if text is empty
      var text = SL.editorController.get('texts').objectAt(0).save('push');
    }
    // Server telling us to add an object
    else if (message.type == 'create') {
      if (SL.editorController.get('pages').findBy('id', message.page.id)) {
        console.error("Error: page id:%i already exists locally!", message.page.id);
      }
      else {
        SL.editorController.newPage('editor-canvases', 600, 600, false, message.page.id);
      }
    }
    // We told server to update object
    else if (message.type == 'affirmUpdate') {
    }
    // Server telling us to update an object
    else if (message.type == 'affirmDestroy') {
      //console.log(message); duplicated above
    }
    else if (message.type == 'destroy') {
      /*var em_obj = SL.editorController.get('pages').findBy('id', message.page.id);
      SL.editorController.get('pages').removeObject(em_obj);
      em_obj.remove('local');*/
    }
  },

  // recieve create/edit/destroy text actions from server
  textEmitHandler: function(message) {
    console.log(message);

    // We told server of new object, server responding with new id
    if (message.type == 'affirmCreate') {
      var text = SL.editorController.get('texts').findBy('id', 0);
      text.set('id', message.text.id);
    }
    // Server telling us to add an object
    else if (message.type == 'create') {
      if (SL.editorController.get('texts').findBy('id', message.text.id)) {
        console.error("Error: text id:%i already exists locally!", message.text.id);
      }
      else {
        var page_id = message.page_id == undefined ? message.text.page_id : message.page_id;
        var rg_page = SL.editorController.get('pages').findBy('id', page_id);
        var em_text = SL.editorController.get('texts').findBy('id', 0);
        em_text.setProperties({
          id: message.text.id,
          page_id: page_id,
          x_pos: message.text.x_pos,
          y_pos: message.text.y_pos,
        });

        em_text.get('object').val(message.text.value);
      }
    }
    // We told server to update object
    else if (message.type == 'affirmUpdate') {
    }
    // Server telling us to update an object
    else if (message.type == 'update') {
      var em_obj = SL.editorController.get('texts').findBy('id', message.text.id);
      if (!em_obj) {
        console.error("Error: text id:%i does not exists locally!", message.text.id);
      }
      else {
        em_obj.setProperties({
          text:  message.text.value,
          x_pos:  message.text.x_pos,
          y_pos:  message.text.y_pos
        });
        em_obj.update('local');
      }
    }
    else if (message.type == 'affirmDestroy') {
    }
    else if (message.type == 'destroy') {
    }
  }
});
