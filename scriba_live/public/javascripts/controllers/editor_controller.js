// this is the controller for editor-related stuff

SL.EditorController = Em.Controller.extend({

  // object arrays
  notes: [],
  pages: [],
  texts: [],
  rects: [],
  ovals: [],

  // variables
  tool: 'text',
  active: null,
  is_down: false,
  is_tool: false,

  // computed properties

  // init funciton called when this controller is instantiated.
  init: function() {

    // musts call this._super() for ember
    this._super();
  },

  // this funciton will initialize a demo paper (should be done from socket code)
  startDemo: function() {

    // initalize a new page to draw on
    var page = this.newPage('editor-canvas', 300, 400);
  },

  // CRUD FOR SOCKET.IO TO CREATE THINGS

  createPage: function(values) { },

  createText: function (values) { },

  createPath: function (values) { },

  createRect: function(values) { },

  createOval: function(values) { },

  // CRUD FOR USERS TO CREATE THINGS

  // create and save a new page
  newPage: function(id, width, height) {
    var controller = SL.editorController;

    // create a new raphael paper to draw stuff on
    var paper = controller.newRaphPage(id, width, height);
    controller.newTextArea(id, width, height);


    // create new page
    var page = SL.Page.create({
      width: width,
      height: height,
      page_index: controller.get('pages').get('length'),
      object: paper // associated raphael object
    });

    // push new page into pages array
    controller.get('pages').pushObject(page);
  },

  // add a new text area to editor
  newTextArea: function(id, width, height) {
    var textarea = $("#"+id).append("<textarea id='"+id+"-textarea' style='width: "+width+"px; height: "+height+"px;'></textarea>");

    // add events to text area
  },

  newText: function(obj) {
    var text = SL.Text.create({
      x_pos: obj.attr('x'),
      y_pos: obj.attr('y'),
      text: '',
      object: obj
    });

    SL.editorController.get('texts').pushObject(text);
  },

  newPath: function(obj) { },

  newRect: function(obj) {
    var rect = SL.Rect.create({
      x_pos: obj.attr('x'),
      y_pos: obj.attr('y'),
      width: obj.attr('width'),
      height: obj.attr('height'),
      object: obj
    });

    SL.editorController.get('rects').pushObject(rect);
  },

  newOval: function(obj) {
    var oval = SL.Oval.create({
      x_pos: obj.attr('cx'),
      y_pos: obj.attr('cy'),
      width: obj.attr('rx'),
      height: obj.attr('ry'),
      object: obj
    });

    SL.editorController.get('ovals').pushObject(oval);
  },

  // CRUD FOR RAPHAEL OBJECTS

  // Create & save a new raphel paper
  newRaphPage: function(id, width, height) {
    // instantiate a new paper object
    var paper = Raphael(id, width, height);

    // add an event handler to mouse events
    paper.canvas.onmousedown = SL.editorController.useToolDown;
    paper.canvas.onmouseup = SL.editorController.useToolUp;
    paper.canvas.onmousemove = SL.editorController.mouseMove;

    // return index of new paper
    return paper;
  },

  newRaphText: function(page, x, y) {
    // create new raphael text object
    var text = page.get('object').text(x, y, "").attr('text-anchor', 'start');

    // add event handlers here

    // return text
    return text;
  },

  newRaphPath: function() { },

  newRaphRect: function(page, x, y, width, height) {
    // create new raphael rect object
    var rect = page.get('object').rect(x, y, width, height);

    // add event handlers like drag etc.

    // return rect
    return rect;
  },

  newRaphOval: function(page, cx, cy, rx, ry) {
    // create new raphael ellipse object
    var oval = page.get('object').ellipse(cx, cy, rx, ry);

    // add event handlers like drag etc.

    // return ellipse
    return oval;
  },

  // EVENT HANDLERS

  // tool handler while mouse is down
  useToolDown: function(event) {
    SL.editorController.set('is_down', true);

    var tool = SL.editorController.get('tool');

    /*if (tool == "text") {
      SL.editorController.newTextDown(event);
    }
    else*/ if (tool == "rect") {
      SL.editorController.newRectDown(event);
    }
    else if (tool == "oval") {
      SL.editorController.newOvalDown(event);
    }

  },

  // tool handler when mouse is released
  useToolUp: function(event) {
    var tool = SL.editorController.get('tool');

    /*if (tool == "text") {
      SL.editorController.newTextUp(event);
    }
    else*/ if (tool == "rect") {
      SL.editorController.newRectUp(event);
    }
    else if (tool == "oval") {
      SL.editorController.newOvalUp(event);
    }

    SL.editorController.set('is_down', false);
  },

  // while mouse is moving, do appropriate action
  mouseMove: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (controller.get('is_down')) {
      if (tool == 'rect') {
        controller.resizeRect(event.offsetX, event.offsetY);
      }
      else if (tool == 'oval') {
        controller.resizeOval(event.offsetX, event.offsetY);
      }
    }
  },

  // lisents to keypress events
  keyPress: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');


    if (tool == 'text') {
      /*var text = controller.get('active');
      var value = text.attr('text');

      // if enter
      if (event.which == 13) {
        text.attr({
          text: value + "\n",
        });
      }
      // if backspace
      else if (event.which == 8) {
        text.attr({
          text: value.substring(0, ( value.length - 1 < 0 ? 0 : value.length - 1))
        });
        // stop key event from propogating to browser
        event.preventDefault();
      }
      // if character
      else {
        text.attr({
          text: value + String.fromCharCode(event.which),
        });
      }*/
    }
  },

  // EVENT HELPERS


  /*newTextDown: function(event) {
    var controller = SL.get('editorController');

    // get current page
    var page = controller.get('pages').objectAt(0);

    // create new raphael text object
    var text = controller.newRaphText(page, event.offsetX, event.offsetY);

    // set active value to text so other events know what to edit
    controller.set('active', text);
  },

  newTextUp: function(event) {
    var controller = SL.get('editorController');

    // save text to object array
    var obj = controller.get('active');
    var text = controller.newText(obj);

    // save text to server
    controller.saveText(text);
  },*/


  newRectDown: function(event) {
    var controller = SL.get('editorController');

    // get current page
    var page = controller.get('pages').objectAt(0);

    // save original starting x and y
    controller.set('ox', event.offsetX);
    controller.set('oy', event.offsetY);

    // create a new rectangle to shape where mouse clicks down
    var rect = controller.newRaphRect(page, event.offsetX, event.offsetY, 1, 1);

    // set active value to rectangle so other events know what to edit
    controller.set('active', rect);
  },

  newRectUp: function(event) {
    var controller = SL.get('editorController');

    // save rectangle to object array
    var obj = controller.get('active');
    var rect = controller.newRect(obj);

    // save to server
    controller.saveRect(obj);

    // clear active
    controller.set('active', null);
  },

  resizeRect: function(x, y) {
    var controller = SL.get('editorController');
    var rect = controller.get('active');

    var ox = controller.get('ox');
    var oy = controller.get('oy');

    // Keep width > 0
    if (x > ox) {
      rect.attr({width:  x - ox});
    }
    else if (x == ox) {
      rect.attr({width:  1});
    }
    else { // x < ox
      rect.attr({
        x: x,
        width: ox - x
      });
    }

    // Keep height > 0
    if (y > oy) {
      rect.attr({height:  y - oy});
    }
    else if (y == oy) {
      rect.attr({height:  1});
    }
    else { // y < oy
      rect.attr({
        y: y,
        height: oy - y
      });
    }
  },


  newOvalDown: function(event) {
    var controller = SL.get('editorController');

    // get current page
    var page = controller.get('pages').objectAt(0);

    // save original starting x and y
    controller.set('ox', event.offsetX);
    controller.set('oy', event.offsetY);

    // create a new ellipse to shape where mouse clicks down
    var oval = controller.newRaphOval(page, event.offsetX, event.offsetY, 0.5, 0.5);

    // set active value to ellipse so other events know what to edit
    controller.set('active', oval);
  },

  newOvalUp: function(event) {
    var controller = SL.get('editorController');

    // save ellipse to object array
    var obj = controller.get('active');
    var oval = controller.newOval(obj);

    // save to server
    controller.saveOval(obj);

    // clear active
    controller.set('active', null);
  },

  resizeOval: function(x, y) {
    var controller = SL.get('editorController');
    var oval = controller.get('active');

    var ox = controller.get('ox');
    var oy = controller.get('oy');

    // Calculate new center
    oval.attr({cx: (ox + x) / 2});
    oval.attr({cy: (oy + y) / 2});

    // Keep x radius > 0.5
    if ((x - ox) > 1) {
      oval.attr({rx: (x - ox) / 2});
    }
    else if ((ox - x) > 1) {
      oval.attr({rx: (ox - x) / 2});
    }
    else { // |x - ox| < 1
      oval.attr({rx: 0.5});
    }

    // Keep y radius > 0.5
    if ((y - oy) > 1) {
      oval.attr({ry: (y - oy) / 2});
    }
    else if ((oy - y) > 1) {
      oval.attr({ry: (oy - y) / 2});
    }
    else { // |y - oy| < 1
      oval.attr({ry: 0.5});
    }

  },


  // EMBER HANDLEBARS ACTIONS
  actions: {

    // sets tool to passed tool
    setTool: function(tool) {
      SL.editorController.set('is_down', false);
      SL.editorController.set('tool', tool);
      console.log(tool);
    },
  },

  // GENERAL HELPER FUNCTIONS

  // SAVE FUNCTIONS TO SERVER

  savePage: function(page) { },

  saveText: function(text) { },

  savePath: function(path) { },

  saveRect: function(rect) {
    // call SL.socket_controller code here to save to server
  },

  saveOval: function(oval) { },

});