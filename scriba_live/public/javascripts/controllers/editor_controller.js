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
  last_active: null,
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
    var page = this.newPage('editor-canvas', 600, 600);

    window.onkeydown = SL.editorController.keyDown;
  },

  // CRUD FOR SOCKET.IO TO CREATE THINGS

  createPage: function(page) {
    // create a raphael object
    var paper = SL.editorController.newRaphPage(page.get('id'), page.get('width'), page.get('height'));

    // attach raphael object to page
    page.set('object', paper);

    // save page to pages array
    SL.editorController.get('pages').pushObject(page);
  },

  createText: function (text) {

  },

  createPath: function (path) {

  },

  createRect: function(rect) {
    // get page
    var page = controller.get('pages').objectAt(0);

    // create raphael object
    var raph_rect = SL.editorController.newRaphRect(page,
      rect.get('x'),
      rect.get('y'),
      rect.get('width'),
      rect.get('height')
    );

    // attach raphael object to object on page
    SL.editorController.get('rects').pushObject(rect);
  },

  createOval: function(oval) {

  },

  // CRUD FOR USERS TO CREATE THINGS

  // create and save a new page
  newPage: function(id, width, height) {
    var controller = SL.editorController;

    // create a new raphael paper to draw stuff on
    var paper = controller.newRaphPage(id, width, height);

    // set paper id
    paper.canvas.id = "page-"+controller.get('pages').get('length');

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
    var controller = SL.get('editorController');

    $("#"+id).append("<textarea id='"+id+"-textarea' style='width: "+width+"px; height: "+height+"px;'></textarea>");

    var textarea = $("#"+id+"-textarea");

    // add events to text area
    textarea.keydown(SL.editorController.textKeyDown);

    var text = controller.newText(textarea);
  },

  textKeyDown: function(event) {
    var controller = SL.get('editorController');

    if(event.keyCode === 9) { // tab was pressed
        console.log('tab');

        var textarea = document.getElementById(event.target.id);
        controller.insertTextAtCaret(textarea, '\t');

        event.preventDefault();
    }

    // update text
    var text = controller.get('texts').findBy('element_id', event.target.id);

    if (text) {
      text.update();
    }
  },

  newText: function(obj) {
    var text = SL.Text.create({
      x_pos: obj.attr('x'),
      y_pos: obj.attr('y'),
      text: '',
      object: obj
    });

    SL.editorController.get('texts').pushObject(text);

    return text;
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

    return rect;
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

    return oval;
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

    // build element id
    var element_id = "rect-"+SL.editorController.get('rects').get('length')+"-page-"+page.get('id');

    // style
    rect.attr({
      fill: 'green',
    });

    // set id
    rect.node.id = element_id;

    // add event handlers like drag etc.
    $('#'+element_id).on('mousedown', SL.editorController.rectMouseDown);
    $('#'+element_id).on('mouseup', SL.editorController.rectMouseUp);

    // return rect
    return rect;
  },

  newRaphOval: function(page, cx, cy, rx, ry) {
    // create new raphael ellipse object
    var oval = page.get('object').ellipse(cx, cy, rx, ry);

    // build element id
    var element_id = "oval-"+SL.editorController.get('ovals').get('length')+"-page-"+page.get('id');

    // style
    oval.attr({
      fill: 'green',
    });

    // set id
    oval.node.id = element_id;

    // add event handlers like drag etc.
    $('#'+element_id).on('mousedown', SL.editorController.ovalMoveDown);
    $('#'+element_id).on('mouseup', SL.editorController.ovalMoveUp);

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
      var active = controller.get('active');

      if (tool == 'rect') {
        controller.resizeRect(event.offsetX, event.offsetY);
      }
      else if (tool == 'oval') {
        controller.resizeOval(event.offsetX, event.offsetY);
      }
      else if (tool =='select' && active != null) {
        controller.moveObject(event.offsetX, event.offsetY);
      }

      // prevent events from propogating
      if (tool =='rect' || tool == 'oval' || tool == 'select') {
        event.preventDefault();
      }
    }
  },

  // lisents to keypress events
  keyDown: function(event) {
    // http://www.javascripter.net/faq/keycodes.htm for keycodes
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    console.log(event.which);
    if (tool == 'select') {
      // if delete
      if (event.which == 46) {
        controller.deleteLast();
        event.preventDefault();
      }
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

    // prevent event from propogating
    event.preventDefault();
  },

  newRectUp: function(event) {
    var controller = SL.get('editorController');

    // save rectangle to object array
    var obj = controller.get('active');
    var rect = controller.newRect(obj);

    // save to server
    rect.save();

    // clear active
    controller.popActive();

    // prevent event from propogating
    event.preventDefault();
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

    // prevent event from propogating
    event.preventDefault();
  },

  newOvalUp: function(event) {
    var controller = SL.get('editorController');

    // save ellipse to object array
    var obj = controller.get('active');
    var oval = controller.newOval(obj);

    // save to server
    oval.save();

    // clear active
    controller.popActive();

    // prevent event from propogating
    event.preventDefault();
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

  moveObject: function(x, y) {
    var controller = SL.get('editorController');
    var active = controller.get('active');

    akharazia2 = active;

    if (active.type == 'rect') {
      controller.rectMove(x, y);
    }
    else if (active.type == 'ellipse') {
      controller.ovalMove(x, y);
    }
  },

  rectMouseDown: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {

      // get element id
      var element_id = event.target.id;
      // get SL.Rect instance from array, get it's associated raphael object and
      var rect = controller.get('rects').findBy('element_id', element_id).get('object');

      // set current x and y positions
      controller.set('dx', event.offsetX - rect.attr('x'));
      controller.set('dy', event.offsetY - rect.attr('y'));

      // bring to front
      rect.toFront();

      // set rect to active
      controller.set('active', rect);

      // prevent event from propogating
      event.preventDefault();
    }
  },

  rectMouseUp: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {
      // get SL.Rect instance
      var element_id = event.target.id;
      var rect = controller.get('rects').findBy('element_id', element_id);

      // update SL.Rect instance values
      rect.update();

      // set active to null
      controller.popActive();

      // prevent event from propogating
      event.preventDefault();
    }
  },

  rectMove: function(x, y) {
    var controller = SL.get('editorController');
    var rect = controller.get('active');

    var dx = controller.get('dx');
    var dy = controller.get('dy');

    rect.attr({
      x: x - dx,
      y: y - dy
    });
  },

  ovalMoveDown: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {

      // get element id
      var element_id = event.target.id;
      // get SL.Rect instance from array, get it's associated raphael object and
      var oval = controller.get('ovals').findBy('element_id', element_id).get('object');

      // set current x and y positions
      controller.set('dx', event.offsetX - oval.attr('cx'));
      controller.set('dy', event.offsetY - oval.attr('cy'));

      // bring to front
      oval.toFront();

      // set rect to active
      controller.set('active', oval);

      // prevent event from propogating
      event.preventDefault();
    }
  },

  ovalMoveUp: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {
      // get SL.Rect instance
      var element_id = event.target.id;
      var oval = controller.get('ovals').findBy('element_id', element_id);

      // update SL.Rect instance values
      oval.update();

      // set active to null
      controller.popActive();

      // prevent event from propogating
      event.preventDefault();
    }
  },

  ovalMove: function(cx, cy) {
    var controller = SL.get('editorController');
    var rect = controller.get('active');

    var dx = controller.get('dx');
    var dy = controller.get('dy');

    rect.attr({
      cx: cx - dx,
      cy: cy - dy
    });
  },

  // EMBER HANDLEBARS ACTIONS
  actions: {

    // sets tool to passed tool
    setTool: function(tool) {
      SL.editorController.set('is_down', false);
      SL.editorController.set('tool', tool);
      console.log(tool);

      if (tool == 'text') {
        $('#page-0').css('z-index', '-1');
      }
      else {
        $('#page-0').css('z-index', '1');
      }
    },
  },

  // GENERAL HELPER FUNCTIONS

  popActive: function() {
    var controller = SL.get('editorController');
    var active = controller.get('active');

    controller.set('last_active', active);
    controller.set('active', null);
  },

  deleteLast: function() {
    console.log('delete');
    // get last selected raphael object
    var controller = SL.get('editorController');
    var last_active = controller.get('last_active');

    var type = last_active.type == "ellipse" ? "oval": last_active.type;

    // get Ember object
    var element_id = last_active.node.id;
    var obj = controller.get(type+'s').findBy('element_id', element_id);

    // remove from array
    controller.get(type+'s').removeObject(obj);

    // remove object
    obj.remove();
  },

  // http://stackoverflow.com/questions/3510351/how-do-i-add-text-to-a-textarea-at-the-cursor-location-using-javascript
  // code for inserting at cursor
  getInputSelection: function(el) {
      var start = 0, end = 0, normalizedValue, range,
          textInputRange, len, endRange;

      if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
          start = el.selectionStart;
          end = el.selectionEnd;
      } else {
          range = document.selection.createRange();

          if (range && range.parentElement() == el) {
              len = el.value.length;
              normalizedValue = el.value.replace(/\r\n/g, "\n");

              // Create a working TextRange that lives only in the input
              textInputRange = el.createTextRange();
              textInputRange.moveToBookmark(range.getBookmark());

              // Check if the start and end of the selection are at the very end
              // of the input, since moveStart/moveEnd doesn't return what we want
              // in those cases
              endRange = el.createTextRange();
              endRange.collapse(false);

              if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                  start = end = len;
              } else {
                  start = -textInputRange.moveStart("character", -len);
                  start += normalizedValue.slice(0, start).split("\n").length - 1;

                  if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                      end = len;
                  } else {
                      end = -textInputRange.moveEnd("character", -len);
                      end += normalizedValue.slice(0, end).split("\n").length - 1;
                  }
              }
          }
      }

      return {
          start: start,
          end: end
      };
  },

  offsetToRangeCharacterMove: function(el, offset) {
      return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
  },

  setSelection: function (el, start, end) {
      if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
          el.selectionStart = start;
          el.selectionEnd = end;
      } else if (typeof el.createTextRange != "undefined") {
          var range = el.createTextRange();
          var startCharMove = SL.editorController.offsetToRangeCharacterMove(el, start);
          range.collapse(true);
          if (start == end) {
              range.move("character", startCharMove);
          } else {
              range.moveEnd("character", SL.editorController.offsetToRangeCharacterMove(el, end));
              range.moveStart("character", startCharMove);
          }
          range.select();
      }
  },

  insertTextAtCaret: function(el, text) {
      var pos = SL.editorController.getInputSelection(el).end;
      var newPos = pos + text.length;
      var val = el.value;
      el.value = val.slice(0, pos) + text + val.slice(pos);
      SL.editorController.setSelection(el, newPos, newPos);
  }

});