Ember.TEMPLATES["application_view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\n  <p>This is the application template</p>\n</div>");
  
});

Ember.TEMPLATES["editor"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "note.user_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <input type=\"button\" value=\"View Note\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeNote", "note", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n        </li>\n    ");
  return buffer;
  }

  data.buffer.push("<h>Editor</h>\n<div id=\"editor-container\">\n  <div id=\"editor-menu\">\n    <button id=\"select-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goHome", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Home</button>\n    <button id=\"select-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTool", "select", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Select</button>\n    <button id=\"text-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTool", "text", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Text</button>\n    <button id=\"path-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTool", "path", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Path</button>\n    <button id=\"rect-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTool", "rect", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Rect</button>\n    <button id=\"oval-tool\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTool", "oval", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Oval</button>\n    <input type='text' id=\"fill-palette\"/>\n    <input type='text' id=\"line-palette\"/>\n    <select id=\"line-width\">\n      <option value=\"0\">0</option>\n      <option value=\"1\">1</option>\n      <option value=\"2\" selected=\"selected\">2</option>\n      <option value=\"3\">3</option>\n      <option value=\"4\">4</option>\n      <option value=\"5\">5</option>\n      <option value=\"6\">6</option>\n    </select>\n    <button id=\"add-page\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addPage", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">New Page</button>\n    <button id=\"prev-page\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "prevPage", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">&lt;</button>\n    <button id=\"next-page\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextPage", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">&gt;</button>\n    <span id=\"page-num\">Page 1 of 0</span>\n  </div>\n<div id=\"editor-canvases\"></div>\n</div>\n<div id=\"dino-notes\">\n    <input id=\"date-picker\" type=\"text\"/>\n    <ul>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "note", "in", "controller.dino_notes", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["preferences"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Preferences</h1>\n\n<h4>Naming:</h4>\n<form action=\"/users\" method=\"get\">\n  <label for=\"first_name\">First Name</label>\n  <input type=\"text\" name=\"first_name\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change First Name\"><br>\n</form>\n\n<form action=\"/users\" method=\"get\">\n  <label for=\"last_name\">Last Name</label>\n  <input type=\"text\" name=\"last_name\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Last Name\"><br>\n</form>\n\n<form action=\"/users\" method=\"get\">\n  <label for=\"email\">E-Mail</label>\n  <input type=\"text\" name=\"email\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Email\"><br><br>\n</form>\n\n<h4>Change you password:</h4>\n<form action=\"/users\" method=\"get\">\n  <label for=\"password\">Old Password</label>\n  <input type=\"password\" name=\"password\"><br>\n  <label for=\"password_confirmation\">Confirm</label>\n  <input type=\"password\" name=\"password_confirmation\"><br>\n  <label for=\"password\">New Password</label>\n  <input type=\"password\" name=\"new_password\"><br>\n  <label for=\"password_confirmation\">New Password Confirm</label>\n  <input type=\"password\" name=\"new_password_confirmation\"><br>\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Password\">\n</form>\n\n");
  
});

Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n    <h1>My Schools</h1>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "controller.home_schools_list.length", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <ul class=\"l\" style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "school", "in", "controller.home_schools_list", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n    <h1>My Classes</h1>\n\n    <ul class=\"r\" style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "controller.home_dinoes.length", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "dino", "in", "controller.home_dinoes", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n      You are not enrolled in any schools\n    ");
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n          School: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          Location: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.city", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.state", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.country", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          <input type=\"button\" value=\"Remove school\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeSchool", "school", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n        </li>\n      ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n        You are not enrolled in any classes\n      ");
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n          Department: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.department", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          Course: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.course", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          Scheduled: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.semester", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("&nbsp;");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.year", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          Instructor: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.instructor_last_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.instructor_first_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          <input type=\"button\" value=\"Take Notes\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startEditor", "dino", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n          <input type=\"button\" value=\"Remove class\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeDino", "dino", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n        </li>\n      ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n  <h1>Class Search and Creation</h1>\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_years", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_semesters", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_dinoes", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_schools", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_years", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_semesters", {hash:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_dinoes", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_schools", {hash:{},inverse:self.noop,fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_schools", {hash:{},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.searching_dinoes", {hash:{},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toStart", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >School</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_school.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n  ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toStart", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >School</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_school.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toYear", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >Year</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_year.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n  ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toStart", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >School</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_school.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toYear", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >Year</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_year.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n    <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toSemester", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >Semester</a> (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_semester.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n    ->\n  ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <ul style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "school", "in", "controller.all_schools_list", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "page", "in", "controller.school_pages_list", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <br>\n  ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n            School: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n            Location: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.city", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.state", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" -- ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "school.country", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n            <input type=\"button\" value=\"View Classes\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewSemestersBySchool", "school", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n            <input type=\"button\" value=\"Join School\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "enrollSchool", "school", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n        </li>\n      ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "page.is_current", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "page.number", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <a href='# '");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setSchoolsPageIndex", "page", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "page.number", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n      ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <ul style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "year", "in", "controller.all_years_list", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n          ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "year.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          <input type=\"button\" value=\"Filter\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewSemestersByYear", "year", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n        </li>\n      ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <ul style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "semester", "in", "controller.all_semesters_list", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  ");
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n          ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "semester.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n          <input type=\"button\" value=\"Filter\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewDinoesBySemester", "semester", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" /><br><br>\n        </li>\n      ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <ul style=\"list-style: none;\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "dino", "in", "controller.filtered_dinoes_list", {hash:{},inverse:self.noop,fn:self.program(32, program32, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  ");
  return buffer;
  }
function program32(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <li>\n            Department: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.department", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n            Course: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.course", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n            Instructor: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.instructor_last_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(", ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dino.instructor_first_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n            <input type=\"button\" value=\"Enroll\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "enrollDino", "dino", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n        </li>\n      ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.show_schools_back_button", {hash:{},inverse:self.noop,fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.show_schools_forward_button", {hash:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <br><br>\n  ");
  return buffer;
  }
function program35(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <input type=\"button\" value=\"Back\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "schoolsBack", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n    ");
  return buffer;
  }

function program37(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <input type=\"button\" value=\"Next\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "schoolsForward", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n    ");
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "controller.all_schools.length", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    Create a New School<br>\n    <input type=\"text\" placeholder=\"Title\" id=\"title-id\">\n    <input type=\"text\" placeholder=\"City\" id=\"city-id\">\n    <input type=\"text\" placeholder=\"State\" id=\"state-id\">\n    <input type=\"text\" placeholder=\"Country\" id=\"country-id\">\n    <input type=\"button\" value=\"Create\" id=\"create_school-id\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "callCreateSchool", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n  ");
  return buffer;
  }
function program40(depth0,data) {
  
  
  data.buffer.push("ScribaLive does not have any schools created yet!<br><br>");
  }

function program42(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "controller.filtered_dinoes.length", {hash:{},inverse:self.noop,fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    Create a New Class<br>\n    <input type=\"text\" placeholder=\"Department\" id=\"department-id\">\n    <input type=\"text\" placeholder=\"Course\"     id=\"course-id\">\n    <input type=\"text\" placeholder=\"Instructor First Name\" id=\"ins_f_n-id\">\n    <input type=\"text\" placeholder=\"Instructor Last Name\" id=\"ins_l_n-id\">\n    <input type=\"button\" value=\"Create\" id=\"create_dino-id\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "callCreateDino", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n  ");
  return buffer;
  }
function program43(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("This school does not have any ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_semester.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" classes<br><br>");
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n  <h1>Settings</h1>\n    <h4>My Information:</h4>\n\n    First Name: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.info_first_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n    Last Name: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.info_last_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n    Email: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.info_email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.has_updated_info", {hash:{},inverse:self.noop,fn:self.program(46, program46, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <br><h4>Change My Information:</h4>\n    First Name:");
  hashContexts = {'type': depth0,'value': depth0,'placeholder': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'placeholder': "STRING",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("controller.updated_user_first_name"),
    'placeholder': ("First Name"),
    'id': ("updated_first_name-id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<br>\n    Last Name:");
  hashContexts = {'type': depth0,'value': depth0,'placeholder': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'placeholder': "STRING",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("controller.updated_user_last_name"),
    'placeholder': ("Last Name"),
    'id': ("updated_last_name-id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<br>\n    Email:");
  hashContexts = {'type': depth0,'value': depth0,'placeholder': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'placeholder': "STRING",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'value': ("controller.updated_user_email"),
    'placeholder': ("Email"),
    'id': ("updated_email-id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<br>\n\n    \n");
  return buffer;
  }
function program46(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <input type=\"button\" value=\"Update\" id=\"update_user_button-id\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateUser", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n    ");
  return buffer;
  }

  data.buffer.push("Welcome ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_user_first_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("&nbsp;");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.current_user_last_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("!<br><br>\n\n<input type=\"button\" value=\"Home\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTab", "home_tab", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n<input type=\"button\" value=\"Enroll\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTab", "enroll_tab", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n<input type=\"button\" value=\"Settings\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setTab", "settings_tab", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n<input type=\"button\" value=\"Log out\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n\n<div id=\"subnavinfo\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.is_home_tab", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.is_enroll_tab", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.is_settings_tab", {hash:{},inverse:self.noop,fn:self.program(45, program45, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["signin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <div class=\"alert alert-danger\">Invalid username or password</div>\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"alert alert-success\">Email sent! It may take a few\n              minutes to make its way to you.</div>\n          ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"alert alert-warning\">Hang on, you didn't enter an email\n              address!</div>\n          ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"alert alert-danger\">It looks like we couldn't find your\n              account. Double check the address you entered is correct.</div>\n          ");
  }

  data.buffer.push("<h3>Sign in</h3>\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "loginFailed", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <label class=\"col-sm-4\" for=\"signin_email\">E-Mail</label>\n    <input class=\"col-sm-8\" id=\"signin_email\" placeholder=\"me@example.com\"\n     name=\"signin_email\"\n     type=\"text\">\n   </div>\n  <div class=\"form-group\">\n    <label class=\"col-sm-4\" for=\"signin_password\">Password</label>\n    <input class=\"col-sm-8\" id=\"signin_password\" name=signin_password \n     type=\"password\">\n  </div>\n  <div class=\"col-sm-4\">\n    <button class=\"btn\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submitSignin", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Sign In</button>\n  </div>\n  <a href=\"#\" id=\"forgot-pass\" class=\"col-sm-8\" data-toggle=\"modal\"\n     data-target=\"#forgot-pass-modal\">\n    Forgot your password?\n  </a>\n\n  <!-- hidden modal -->\n  <div class=\"modal fade\" id=\"forgot-pass-modal\" tabindex=\"-1\" role=\"dialog\"\n    aria-labelledby=\"#forgot-pass-title\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n            aria-hidden=\"true\">\n            &times;\n          </button>\n          <h4 class=\"modal-title\" id=\"forgot-pass-title\">Reset Password</h4>\n        </div>\n        <div class=\"modal-body\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "resetSent", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "resetEmpty", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "resetFailed", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          If you've forgotten your password, you can reset it here. Just give us\n          the email address you used to register, and we'll send it to you\n          shortly.\n          <br>\n          <br>\n          <div class=\"col-sm-8 col-sm-offset-2\">\n            <form role=\"form\">\n              <div class=\"form-group\">\n                <label for=\"#reset-pass-email\" class=\"control-label col-xsm-8\">Email Address</label>\n                <input type=\"text\" class=\"form-control\" id=\"reset-pass-email\"\n                  placeholder=\"email@example.com\">\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button class=\"btn btn-primary\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetPassword", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            Reset Password\n          </button>\n          <button class=\"btn\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n");
  return buffer;
  
});

Ember.TEMPLATES["users_new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <div class=\"alert alert-warning\">Error, unable to create a new account.</div>\n");
  }

  data.buffer.push("<h3>Sign up</h3>\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "createError", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <div class=\"col-sm-4\">\n      <label class=\"control-label\">Name</label>\n    </div>\n    <div class=\"col-sm-4\">\n      <input class=\"firstname form-control\" type=\"text\" name=\"first_name\">\n    </div>\n    <div class=\"col-sm-4\">\n      <input class=\"lastname form-control\" type=\"text\" name=\"last_name\">\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"col-sm-4\">\n      <label class=\"control-label\" for=\"email\">E-Mail</label>\n    </div>\n    <div class=\"col-sm-8\">\n      <input class=\"form-control\" type=\"text\" name=\"email\">\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"col-sm-4\">\n      <label class=\"control-label\" for=\"password\">Password</label>\n    </div>\n    <div class=\"col-sm-4\">\n      <input class=\"form-control\" type=\"password\" name=\"password\">\n    </div>\n    <div class=\"col-sm-4\">\n      <input class=\"form-control\" type=\"password\" name=\"password_confirmation\">\n    </div>\n  </div>\n  <button class=\"btn\" type=\"submit\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createUser", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Submit</button>\n</form>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["users"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <tr>\n          <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "first_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "last_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        </tr>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n  <div class=\"span12\">\n    <table>\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </table>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["welcome"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n  <!--\n  <div class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\n      <div class=\"navbar-header\">\n        <a href=\"/\" class=\"navbar-brand\">ScribaLive</a>\n      </div>\n      <div class=\"navbar-collapse collapse\">\n        <ul class=\"nav navbar-nav\">\n          <li class=\"active\"><a href=\"/\">Home</a></li>\n          <li><a href=\"/editor\">Editor</a></li>\n          <li><a href=\"/profile\">Profile</a></li>\n          <li><a href=\"/preferences\">Preferences</a></li>\n        </ul>\n      </div>\n  </div>\n  -->\n</div>\n<div class=\"hero-unit\">\n  <h1>Welcome to ScribaLive!</h1>\n  <p>ScribaLive lets you share your notes as you take them.</p>\n</div>\n<div id=\"flashmessage\"></div>\n<div class=\"container content\">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      ");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.SigninView", {hash:{
    'controllerBinding': ("SL.signinController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <div id=\"splash_image\" class=\"col-md-4\">\n      <img src=\"/img/welcome1.jpg\"/>\n    </div>\n    <div class=\"col-md-4\">\n      ");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.UsersNewView", {hash:{
    'controllerBinding': ("SL.usersNewController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n</div>\n</div>\n");
  return buffer;
  
});