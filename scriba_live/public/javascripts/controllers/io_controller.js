SL.IoController = Em.Controller.extend({
  // controller variables
  socket: null,
  note_id: null,
  current_dino: null,
  current_date: "",
  current_user_id: 0,
  initialized_pages: false,


  // connect to server
  createConnection: function(){
    SL.editorController.startEditor();

    SL.ioController.set('current_date', moment().format('L'));

    $("#date-picker").val(moment().format('L'));

    var user_id = $('#user-id').html();
    var dino_id = $('#dino-id').html();

    SL.ioController.set('current_user_id', user_id);

    var socket = io.connect();
    SL.ioController.set('socket', socket);

    // register handlers to receive events from server
    // note (room) event
    socket.on('note', SL.ioController.noteEmitHandler);
    //rectangle event
    socket.on('page', SL.ioController.pageEmitHandler);
    //rectangle event
    socket.on('rect', SL.ioController.rectEmitHandler);
    //oval event
    socket.on('oval', SL.ioController.ovalEmitHandler);
    //path event
    socket.on('path', SL.ioController.pathEmitHandler);
    //text event
    socket.on('text', SL.ioController.textEmitHandler);
    //dino events
    socket.on('getAllDinoNotes', SL.ioController.getAllDinoNotesEmitHandler);
    socket.on('getDino', SL.ioController.getDinoEmitHandler);

    // Find note to connect to
    socket.emit('getNoteID', {dino_id: dino_id, date: moment().format('L'), user_id: user_id});
    SL.ioController.getCurrentDino();
  },

  getCurrentDino: function() {
    var dino_id = $('#dino-id').html();

    SL.ioController.getDino(dino_id);
  },

  getDino: function (dino_id) {
    var socket = SL.ioController.get('socket');

    socket.emit('getDino', {dino_id: dino_id});
  },

  getAllDinoNotes: function() {
    var user_id = $('#user-id').html();
    var date = SL.ioController.get('current_date');
    var socket = SL.ioController.get('socket');
    var dino = SL.ioController.get('current_dino');

    socket.emit('getAllDinoNotes', {dino_id: dino.id, date: date, user_id: user_id});
  },

  changeNote: function(date, user_id) {
    var dino_id = $('#dino-id').html();

    SL.ioController.set('note_id', null);
    SL.ioController.get('socket').emit('leaveNote');
    SL.ioController.set('current_user_id', user_id);
    SL.editorController.clearNote();

    SL.ioController.get('socket').emit('getNoteID', {dino_id: dino_id, date: date, user_id: user_id});
  },

  //note1: function() {SL.ioController.changeNote('CSCI430', "11/18/2013", 1);},
  //note2: function() {SL.ioController.changeNote('MATH217', "11/18/2013", 1);},

  initPageObjects: function(page_id) {
    SL.ioController.get('socket').emit('rect', {type: 'getAll', page_id: page_id});
    SL.ioController.get('socket').emit('oval', {type: 'getAll', page_id: page_id});
    SL.ioController.get('socket').emit('path', {type: 'getAll', page_id: page_id});
    SL.ioController.get('socket').emit('text', {type: 'getAll', page_id: page_id});
  },

  // push create/edit/destroy page actions to server
  pushPageCreate: function(page) {
    var note_id = SL.ioController.get('note_id');
    if (note_id) {
      SL.ioController.get('socket').emit('page', {type: 'create'});
    }
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
  pushRectCreate: function(em_obj) {
    var data = {
      type: 'create',
      object: {
        page_id: em_obj.get('page_id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        width:  em_obj.get('width'),
        height: em_obj.get('height'),
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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
        height: em_obj.get('height'),
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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
  pushOvalCreate: function(em_obj) {
    var data = {
      type: 'create',
      object: {
        page_id: em_obj.get('page_id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        width:  em_obj.get('width'),
        height: em_obj.get('height'),
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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
        height: em_obj.get('height'),
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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
  pushPathCreate: function(em_obj) {
    var data = {
      type: 'create',
      object: {
        page_id: em_obj.get('page_id'),
        x_pos:  em_obj.get('x_pos'),
        y_pos:  em_obj.get('y_pos'),
        path:   em_obj.get('object').node.attributes.d.value,
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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
        path:   em_obj.get('object').node.attributes.d.value,
        fill_color: em_obj.get('fill_color'),
        fill_alpha: em_obj.get('fill_alpha'),
        line_width: em_obj.get('line_width'),
        line_color: em_obj.get('line_color')
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


  // recieve note actions from server
  noteEmitHandler: function(message) {
    console.log(message);

    // we got note id from server, now join room
    if (message.type == 'noteID') {
      SL.ioController.set('note_id', message.note.id)
      SL.ioController.get('socket').emit('joinNote', message.note.id);
    }

    // we are now in the room, request pages in note
    if (message.type == 'affirmjoinNote') {
      SL.ioController.get('socket').emit('page', {type: 'getAll'});
    }
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
        var rg_page = SL.editorController.get('pages').findBy('id', message.rect.page_id);
        var rg_rect = SL.editorController.newRaphRect(rg_page,
          message.rect.x_pos,
          message.rect.y_pos,
          message.rect.x_size,
          message.rect.y_size,
          {
            fill_color: message.rect.fill_color,
            fill_alpha: message.rect.fill_alpha,
            line_width: message.rect.line_width,
            line_color: message.rect.line_color
          }
        );
        var em_rect = SL.Rect.create({
          id: message.rect.id,
          page_id: message.rect.page_id,
          note_id: 0,
          user_id: 0,
          x_pos: message.rect.x_pos,
          y_pos: message.rect.y_pos,
          width: message.rect.x_size,
          height: message.rect.y_size,
          fill_color: message.rect.fill_color,
          fill_alpha: message.rect.fill_alpha,
          line_width: message.rect.line_width,
          line_color: message.rect.line_color,
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
          height: message.rect.y_size,
          fill_color: message.rect.fill_color,
          fill_alpha: message.rect.fill_alpha,
          line_width: message.rect.line_width,
          line_color: message.rect.line_color
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
        var rg_page = SL.editorController.get('pages').findBy('id',message.oval.page_id);
        var rg_oval = SL.editorController.newRaphOval(rg_page,
          message.oval.x_pos,
          message.oval.y_pos,
          message.oval.x_size,
          message.oval.y_size,
          {
            fill_color: message.oval.fill_color,
            fill_alpha: message.oval.fill_alpha,
            line_width: message.oval.line_width,
            line_color: message.oval.line_color
          }
        );
        var em_oval = SL.Oval.create({
          id: message.oval.id,
          page_id: message.oval.page_id,
          note_id: 0,
          user_id: 0,
          x_pos:  message.oval.x_pos,
          y_pos:  message.oval.y_pos,
          width:  message.oval.x_size,
          height: message.oval.y_size,
          fill_color: message.oval.fill_color,
          fill_alpha: message.oval.fill_alpha,
          line_width: message.oval.line_width,
          line_color: message.oval.line_color,
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
          ry: message.oval.y_size,
          fill_color: message.oval.fill_color,
          fill_alpha: message.oval.fill_alpha,
          line_width: message.oval.line_width,
          line_color: message.oval.line_color
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
        var rg_page = SL.editorController.get('pages').findBy('id', message.path.page_id);
        var rg_path = SL.editorController.newRaphPath(rg_page, message.path.value, {
          line_color: message.path.line_color,
          line_width: message.path.line_width
        });
        var em_path = SL.Path.create({
          id: message.path.id,
          page_id: message.path.page_id,
          note_id: 0,
          user_id: 0,
          x_pos: message.path.x_pos,
          y_pos: message.path.y_pos,
          path:  message.path.value,
          fill_color: message.path.fill_color,
          fill_alpha: message.path.fill_alpha,
          line_width: message.path.line_width,
          line_color: message.path.line_color,
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
        em_obj.set('fill_color', message.path.fill_color);
        em_obj.set('fill_alpha', message.path.fill_alpha);
        em_obj.set('line_width', message.path.line_width);
        em_obj.set('line_color', message.path.line_color);
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

    // Server done sending pages, we can now request objects
    if (message.type == 'initPages') {
      // create a new page if none exist
      if (!SL.editorController.get('pages').get('length')) {
        console.log("creating first page");
        SL.editorController.newPage('editor-canvases', 600, 600, true, 0);
      }
    }
    // We told server of new object, server responding with new id
    else if (message.type == 'affirmCreate') {
      var em_page = SL.editorController.get('pages').findBy('id', 0);
      var text = SL.editorController.get('texts').findBy('page_id', 0);
      em_page.set('id', message.page.id);
      SL.editorController.dispPageNum(SL.editorController.get('active_page'));

      text.set('page_id', message.page.id);
      text.save('push');
      // check if text is empty - why? Do you mean query the server (already done by getAll)?
//      var text = SL.editorController.get('texts').objectAt(0).save('push');
    }
    // Server telling us to add an object
    else if (message.type == 'create') {
      if (SL.editorController.get('pages').findBy('id', message.page.id)) {
        console.error("Error: page id:%i already exists locally!", message.page.id);
      }
      else {
        SL.editorController.newPage('editor-canvases', 600, 600, false, message.page.id);
        // get objects on page
        SL.ioController.initPageObjects(message.page.id);
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
        var rg_page = SL.editorController.get('pages').findBy('id', message.text.page_id);
        var em_text = SL.editorController.get('texts').findBy('id', 0);
        em_text.setProperties({
          id: message.text.id,
          page_id: message.text.page_id,
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
  },

  getAllDinoNotesEmitHandler: function(message) {
    console.log(message);

    if (message.notes.length) {
      akharazia5 = message;
      // populate class_notes
      for (i = 0; i < message.notes.length; i++) {
        var note = SL.Note.create({
          id: message.notes[i].id,
          title: message.notes[i].title,
          date: message.notes[i].date,
          dino_id: message.notes[i].dino_id,
          user_id: message.notes[i].user_id,
          user_name: message.notes[i].user.first_name + " " + message.notes[i].user.last_name
        });

        SL.editorController.get('dino_notes').pushObject(note);
      }
    }
    else {
      console.error("There are no other notes for this class and date");
    }
  },

  getDinoEmitHandler: function(message) {
    if (message.success) {
      var dino = SL.Dino.create({
        id: message.dino.id,
        school_id: message.dino.school_id,
        year: message.dino.year,
        semester: message.dino.semester,
        department: message.dino.department,
        course: message.dino.course,
        instructor_first_name: message.dino.instructor_first_name,
        instructor_last_name: message.dino.instructor_last_name
      });

      SL.ioController.set('current_dino', dino);
      SL.ioController.getAllDinoNotes();
    }
    else {
      console.error("Something went wrong with getting the current dino");
    }
  }
});
