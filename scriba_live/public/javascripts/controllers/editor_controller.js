// this is the controller for editor-related stuff

SL.EditorController = Em.Controller.extend({

  // object arrays
  pages: [],
  texts: [],
  rects: [],
  ovals: [],
  paths: [],

  // variables
  tool: 'text',
  active: null,
  last_active: null,
  active_page: null,
  is_down: false,
  is_tool: false,

  // computed properties

  // init funciton called when this controller is instantiated.
  init: function() {

    // musts call this._super() for ember
    this._super();
  },

  // general required start functions
  startEditor: function() {
    window.onkeydown = SL.editorController.keyDown;
  },

  // CRUD FOR USERS TO CREATE THINGS
  uniqueID: (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
  })(), // Invoke the outer function after defining it.

  // create and save a new page
  newPage: function(container_id, width, height, save, sq_page_id) {
    var controller = SL.editorController;

    // Get unique id for div and paper DOM id fields
    var uid = controller.uniqueID();

    // inject new div for page
    var div_id = "canvas-page-"+uid;
    $('#'+container_id).append('<div class="canvas-page" id="'+div_id+'"></div>');

    // create a new raphael paper to draw stuff on and assign an id
    var rg_paper = controller.newRaphPage(div_id, width, height);
    rg_paper.canvas.id = "paper-"+uid;

    var text = controller.newTextArea(div_id, width, height, sq_page_id);

    // create new page
    var em_page = SL.Page.create({
      id: sq_page_id,
      width: width,
      height: height,
      jq_id: '#'+div_id,
      object: rg_paper // associated raphael object
    });

    // save to server
    if (save) {
      em_page.save('push');
    }

    // hide additional pages received from server
    if (sq_page_id && controller.get('pages').get('length')) {
      $(em_page.jq_id).hide();
    }
    else {
      // make new page active if first or created locally
      em_active = controller.get('active_page');
      if (em_active) {
        $(em_active.jq_id).hide();
      }
      controller.set('active_page', em_page);
    }
    // push new page into pages array
    controller.get('pages').pushObject(em_page);
    // update displayed page number and total (active may have changed)
    controller.dispPageNum(controller.get('active_page', em_page));
  },

  // sort pages array and update "Page m of n" text
  // pages pending affirmCreate placed at end
  dispPageNum: function(em_page) {
    em_pages = SL.editorController.get('pages');
    em_pages.sort(function(a,b) { return (a.id==0) ? 1 : a.id - b.id } );
    page_index = 1+ em_pages.indexOf(em_page);
    page_total = em_pages.get('length');
    $('#page-num').text("Page "+page_index+" of "+page_total);
  },

  // add a new text area to editor
  newTextArea: function(div_id, width, height, sq_page_id) {
    var controller = SL.get('editorController');

    $("#"+div_id).append("<textarea class='editor-canvas-textarea' id='"+div_id+"-textarea' style='width: "+width+"px; height: "+height+"px;'></textarea>");

    var textarea = $("#"+div_id+"-textarea");

    // add events to text area
    textarea.keydown(SL.editorController.textKeyDown);

    var text = controller.newText(textarea);

    text.set('page_id', sq_page_id);

    return text;
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
      text.update('push');
    }
  },

  newText: function(obj) {
    var text = SL.Text.create({
      page_id: SL.editorController.get('active_page.id'),
      x_pos: obj.attr('x'),
      y_pos: obj.attr('y'),
      text: '',
      object: obj
    });

    SL.editorController.get('texts').pushObject(text);

    return text;
  },

  newPath: function(rg_path) {
    var em_path = SL.Path.create({
      page_id: SL.editorController.get('active_page.id'),
      path: '',
      object: rg_path
    });

    SL.editorController.get('paths').pushObject(em_path);

    return em_path;
  },

  newRect: function(rg_rect) {
    var em_rect = SL.Rect.create({
      page_id: SL.editorController.get('active_page.id'),
      x_pos: rg_rect.attr('x'),
      y_pos: rg_rect.attr('y'),
      width: rg_rect.attr('width'),
      height: rg_rect.attr('height'),
      object: rg_rect
    });

    SL.editorController.get('rects').pushObject(em_rect);

    return em_rect;
  },

  newOval: function(rg_oval) {
    var em_oval = SL.Oval.create({
      page_id: SL.editorController.get('active_page.id'),
      x_pos: rg_oval.attr('cx'),
      y_pos: rg_oval.attr('cy'),
      width: rg_oval.attr('rx'),
      height: rg_oval.attr('ry'),
      object: rg_oval
    });

    SL.editorController.get('ovals').pushObject(em_oval);

    return em_oval;
  },

  // CRUD FOR RAPHAEL OBJECTS

  // Create & save a new raphel paper
  newRaphPage: function(div_id, width, height) {
    // instantiate a new paper object
    var paper = Raphael(div_id, width, height);

    // add an event handler to mouse events
    paper.canvas.onmousedown = SL.editorController.useToolDown;
    paper.canvas.onmouseup = SL.editorController.useToolUp;
    paper.canvas.onmousemove = SL.editorController.mouseMove;
    paper.canvas.onmouseover = SL.editorController.mouseOver;

    // return index of new paper
    return paper;
  },

  newRaphText: function(em_page, x, y) {
    // create new raphael text object
    var rg_text = em_page.get('object').text(x, y, "").attr('text-anchor', 'start');

    // add event handlers here

    // return text
    return rg_text;
  },

  newRaphPath: function(em_page, path_string) {
    // Get locally unique number for DOM id field
    var uid = SL.editorController.uniqueID();

    // create new racphael path object
    var rg_path = em_page.get('object').path(path_string);

    // build element id
    var element_id = "path-"+uid+"-page"+em_page.get('id');

    // style
    rg_path.attr({
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': 2
    });

    // set id
    rg_path.node.id = element_id;

    // add event handlers like drag etc.
    $('#'+element_id).on('mousedown', SL.editorController.pathMoveDown);
    $('#'+element_id).on('mouseup', SL.editorController.pathMoveUp);

    // return path
    return rg_path;
  },

  newRaphRect: function(em_page, x, y, width, height) {
    // Get locally unique number for DOM id field
    var uid = SL.editorController.uniqueID();

    // create new raphael rect object
    var rg_rect = em_page.get('object').rect(x, y, width, height);

    // build element id
    var element_id = "rect-"+uid+"-page-"+em_page.get('id');

    // style
    rg_rect.attr({
      fill: 'green',
    });

    // set id
    rg_rect.node.id = element_id;

    // add event handlers like drag etc.
    $('#'+element_id).on('mousedown', SL.editorController.rectMouseDown);
    $('#'+element_id).on('mouseup', SL.editorController.rectMouseUp);

    // return rect
    return rg_rect;
  },

  newRaphOval: function(em_page, cx, cy, rx, ry) {
    // Get locally unique number for DOM id field
    var uid = SL.editorController.uniqueID();

    // create new raphael ellipse object
    var rg_oval = em_page.get('object').ellipse(cx, cy, rx, ry);

    // build element id
    var element_id = "oval-"+uid+"-page-"+em_page.get('id');

    // style
    rg_oval.attr({
      fill: 'green',
    });

    // set id
    rg_oval.node.id = element_id;

    // add event handlers like drag etc.
    $('#'+element_id).on('mousedown', SL.editorController.ovalMoveDown);
    $('#'+element_id).on('mouseup', SL.editorController.ovalMoveUp);

    // return ellipse
    return rg_oval;
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
    else if (tool == "path") {
      SL.editorController.newPathDown(event);
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
    else if (tool == "path") {
      SL.editorController.newPathUp(event);
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
      else if (tool =='path') {
        controller.drawPath(event.offsetX, event.offsetY);
      }
      else if (tool =='select' && active != null) {
        controller.moveObject(event.offsetX, event.offsetY);
      }

      // prevent events from propagating
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

    // save original starting x and y
    controller.set('ox', event.offsetX);
    controller.set('oy', event.offsetY);

    // create a new rectangle to shape where mouse clicks down
    var rg_rect = controller.newRaphRect(controller.get('active_page'), event.offsetX, event.offsetY, 1, 1);

    // set active value to rectangle so other events know what to edit
    controller.set('active', rg_rect);


    // prevent event from propagating
    event.preventDefault();
  },

  newRectUp: function(event) {
    var controller = SL.get('editorController');

    // save rectangle to object array
    var rg_rect = controller.get('active');
    var em_rect = controller.newRect(rg_rect);

    // save to server
    em_rect.save();

    // clear active
    controller.popActive();

    // prevent event from propagating
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

    // save original starting x and y
    controller.set('ox', event.offsetX);
    controller.set('oy', event.offsetY);

    // create a new ellipse to shape where mouse clicks down
    var oval = controller.newRaphOval(controller.get('active_page'), event.offsetX, event.offsetY, 0.5, 0.5);

    // set active value to ellipse so other events know what to edit
    controller.set('active', oval);


    // prevent event from propagating
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

    // prevent event from propagating
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

  newPathDown: function(event) {
    var controller = SL.get('editorController');

    // save original starting x and y
    controller.set('ox', event.offsetX);
    controller.set('oy', event.offsetY);
    controller.set('lx', event.offsetX);
    controller.set('ly', event.offsetY);

    // create a new ellipse to shape where mouse clicks down
    var rg_path = controller.newRaphPath(controller.get('active_page'), 'M0,0');
    rg_path.transform("t"+(event.offsetX)+","+(event.offsetY));

    // set active value to ellipse so other events know what to edit
    controller.set('active', rg_path);


    // prevent event from propagating
    event.preventDefault();
  },

  newPathUp: function(event) {
    var controller = SL.get('editorController');

    // save ellipse to object array
    var rg_obj = controller.get('active');
    var em_path = controller.newPath(rg_obj);
    em_path.set('x_pos', controller.get('ox'));
    em_path.set('y_pos', controller.get('oy'));

    // save to server
    em_path.save();

    // clear active
    controller.popActive();

    // prevent event from propagating
    event.preventDefault();
  },

  drawPath: function(x, y) {
    var controller = SL.get('editorController');
    var rg_path = controller.get('active');

    var lx = controller.get('lx');
    var ly = controller.get('ly');

    rg_path.attr({
      path: rg_path.attr('path') + 'l' + (x - lx) + ' ' + (y - ly)
    });

    controller.set('lx', x);
    controller.set('ly', y);
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
    else if (active.type == 'path') {
      controller.pathMove(x, y);
    }
  },

  rectMouseDown: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {

      // get SL.Rect instance from array, get it's associated raphael object and
      var rg_rect = controller.get('rects').findBy('element_id', event.target.id).get('object');

      // set current x and y positions
      controller.set('dx', event.offsetX - rg_rect.attr('x'));
      controller.set('dy', event.offsetY - rg_rect.attr('y'));

      // bring to front
      rg_rect.toFront();

      // set rect to active
      controller.set('active', rg_rect);


      // prevent event from propagating
      event.preventDefault();
    }
  },

  rectMouseUp: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {
      // get SL.Rect instance
      var em_rect = controller.get('rects').findBy('element_id', event.target.id);

      // update SL.Rect instance values
      em_rect.update('push');

      // set active to null
      controller.popActive();

      // prevent event from propagating
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

      // get SL.Rect instance from array, get it's associated raphael object and
      var rg_oval = controller.get('ovals').findBy('element_id', event.target.id).get('object');

      // set current x and y positions
      controller.set('dx', event.offsetX - rg_oval.attr('cx'));
      controller.set('dy', event.offsetY - rg_oval.attr('cy'));

      // bring to front
      rg_oval.toFront();

      // set oval to active
      controller.set('active', rg_oval);

      // prevent event from propagating
      event.preventDefault();
    }
  },

  ovalMoveUp: function(event) {
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {
      // get SL.Rect instance
      var em_oval = controller.get('ovals').findBy('element_id', event.target.id);

      // update SL.Rect instance values
      em_oval.update('push');

      // set active to null
      controller.popActive();

      // prevent event from propagating
      event.preventDefault();
    }
  },

  ovalMove: function(cx, cy) {
    var controller = SL.get('editorController');
    var rg_rect = controller.get('active');

    var dx = controller.get('dx');
    var dy = controller.get('dy');

    rg_rect.attr({
      cx: cx - dx,
      cy: cy - dy
    });
  },

   pathMoveDown: function(event) {
    console.log('MOUSEDOWN');
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {

      // get SL.Rect instance from array, get it's associated raphael object and
      var em_path = controller.get('paths').findBy('element_id', event.target.id);
      var rg_path = em_path.get('object');

      // cache mouse down x and y positions
      controller.set('x', event.offsetX);
      controller.set('y', event.offsetY);
      // cache current path origin
      controller.set('ox', em_path.get('x_pos'));
      controller.set('oy', em_path.get('y_pos'));

      // bring to front
      rg_path.toFront();

      // set rect to active
      controller.set('active', rg_path);

      // prevent event from propagating
      event.preventDefault();
    }
  },

  pathMoveUp: function(event) {
    console.log('MOUSEUP');
    var controller = SL.get('editorController');
    var tool = controller.get('tool');

    if (tool == "select") {
      // Calculate new transform amount (origin) for the path
      var em_path = controller.get('paths').findBy('element_id', event.target.id);
      em_path.set('x_pos', controller.get('ox') + event.offsetX - controller.get('x'));
      em_path.set('y_pos', controller.get('oy') + event.offsetY - controller.get('y'));
      em_path.update('push');

      // set active to null
      controller.popActive();

      // prevent event from propagating
      event.preventDefault();
    }
  },

  pathMove: function(x, y) {
    var controller = SL.get('editorController');
    var path = controller.get('active');

    // Calculate transform amount to track mouse
    var dx = controller.get('ox') + x - controller.get('x');
    var dy = controller.get('oy') + y - controller.get('y');

    path.transform("t"+(dx)+","+(dy));
  },

  // EMBER HANDLEBARS ACTIONS
  actions: {

    // sets tool to passed tool
    setTool: function(tool) {
      SL.editorController.set('is_down', false);
      SL.editorController.set('tool', tool);
      console.log(tool);

      if (tool == 'text') {
        $('svg').css('z-index', '-1');
      }
      else {
        $('svg').css('z-index', '1');
      }
      // Forget last selected object when user leaves select tool
      if (tool != 'select') {
        SL.editorController.popActive();
      }
    },

    // add a new page
    addPage: function() {
      // add a new page to current note
      var page = this.newPage('editor-canvases', 600, 600, true, 0);
    },

    prevPage: function() {
      em_page = SL.editorController.get('active_page');
      if (em_page)
      {
        page_index = SL.editorController.get('pages').indexOf(em_page);
        if (page_index > 0)
        {
          $(em_page.jq_id).hide();
          --page_index;
          em_page = SL.editorController.get('pages').objectAt(page_index);
          $(em_page.jq_id).show();

          SL.editorController.set('active_page', em_page);
          SL.editorController.dispPageNum(em_page);
        }
      }
    },

    nextPage: function() {
      em_page = SL.editorController.get('active_page');
      if (em_page)
      {
        page_index = SL.editorController.get('pages').indexOf(em_page);
        if (page_index+1 < SL.editorController.get('pages').get('length'))
        {
          $(em_page.jq_id).hide();
          ++page_index;
          em_page = SL.editorController.get('pages').objectAt(page_index);
          $(em_page.jq_id).show();

          SL.editorController.set('active_page', em_page);
          SL.editorController.dispPageNum(em_page);
        }
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
    var last_active = SL.editorController.get('last_active');
    if (last_active && last_active.node) {
      // translate ellipse -> oval
      var type = last_active.type == "ellipse" ? "oval": last_active.type;

      // get Ember object
      var em_obj = SL.editorController.get(type+'s').findBy('element_id', last_active.node.id);

      // remove from array
      SL.editorController.get(type+'s').removeObject(em_obj);

      // remove object
      em_obj.remove('push');
    }
  },

  // Clear out the old pages
  clearNote: function() {
    var controller = SL.editorController;

    while (em_obj = controller.get('paths').pop()) {
      em_obj.remove('local');
    }
    while (em_obj = controller.get('rects').pop()) {
      em_obj.remove('local');
    }
    while (em_obj = controller.get('ovals').pop()) {
      em_obj.remove('local');
    }
    while (em_obj = controller.get('texts').pop()) {
      em_obj.remove('local');
    }
    while (em_obj = controller.get('pages').pop()) {
      em_obj.remove('local');
    }
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
