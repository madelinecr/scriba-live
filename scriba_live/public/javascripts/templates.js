Ember.TEMPLATES["application_view"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\n  <p>This is the application template</p>\n</div>");
  
});

Ember.TEMPLATES["editor"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<h>Editor</h>\n<div id=\"editor-container\">\n  <div id=\"editor-menu\">\n    <button id=\"select-tool\" ");
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
  data.buffer.push(">Oval</button>\n  </div>\n<div id=\"editor-canvas\"></div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["preferences"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Preferences</h1>\n\n<h4>Naming:</h4>\n<form action=\"/users\" method=\"get\">\n  <label for=\"first_name\">First Name</label>\n  <input type=\"text\" name=\"first_name\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change First Name\"><br>\n</form>\n\n<form action=\"/users\" method=\"get\">\n  <label for=\"last_name\">Last Name</label>\n  <input type=\"text\" name=\"last_name\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Last Name\"><br>\n</form>\n\n<form action=\"/users\" method=\"get\">\n  <label for=\"email\">E-Mail</label>\n  <input type=\"text\" name=\"email\" value=\"\">\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Email\"><br><br>\n</form>\n\n<h4>Change you password:</h4>\n<form action=\"/users\" method=\"get\">\n  <label for=\"password\">Old Password</label>\n  <input type=\"password\" name=\"password\"><br>\n  <label for=\"password_confirmation\">Confirm</label>\n  <input type=\"password\" name=\"password_confirmation\"><br>\n  <label for=\"password\">New Password</label>\n  <input type=\"password\" name=\"new_password\"><br>\n  <label for=\"password_confirmation\">New Password Confirm</label>\n  <input type=\"password\" name=\"new_password_confirmation\"><br>\n  <input type=\"submit\" formaction=\"/users\" value=\"Change Password\">\n</form>\n\n<h4>Schedule:</h4>\n");
  
});

Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>Search for an existing class</h1>\n<input type=\"text\" id=\"search-field\">\n<input type=\"button\" value=\"Find\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "findCurrent", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n\n<input type=>\n\n<h1>Create a new class</h1>\n<input type=\"text\" id=\"create-class\">\n<input type=\"button\" value=\"Create Class\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createClass", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" />\n\n<br><br><a href=\"/preferences\">Preferences</a>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["signin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h3>Sign in</h3>\n<form action=\"/signin\" method=\"post\">\n  <label for=\"signin_email\">E-Mail</label>\n  <input type=\"text\" name=\"signin_email\"><br>\n  <label for=\"signin_password\">Password</label>\n  <input type=\"password\" name=\"signin_password\"><br>\n  <input class=\"btn\" type=\"submit\" formaction=\"/signin\" value=\"Submit\">\n</form>\n");
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h3>Sign up</h3>\n<form action=\"/users\" method=\"post\">\n  <label>Name</label>\n  <input class=\"firstname\" type=\"text\" name=\"first_name\">\n  <input class=\"lastname\" type=\"text\" name=\"last_name\"><br>\n  <label for=\"email\">E-Mail</label>\n  <input type=\"text\" name=\"email\"><br>\n  <label for=\"password\">Password and confirmation</label>\n  <input type=\"password\" name=\"password\">\n  <input type=\"password\" name=\"password_confirmation\"><br>\n  <input class=\"btn\" type=\"submit\" formaction=\"/users\" value=\"Submit\">\n</form>\n");
  
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


  data.buffer.push("<div class=\"container\">\n  <div id=\"hero-unit\">\n    <h1>Welcome to ScribaLive!</h1>\n    <p>ScribaLive lets you share your notes as you take them.</p>\n  </div>\n  <div class=\"row\">\n    <div id=\"signin\" class=\"span4\">\n      ");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.SigninView", {hash:{
    'controllerBinding': ("SL.signinController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <div id=\"splash_image\" class=\"span4\">\n      <img src=\"/img/welcome1.jpg\"/>\n    </div>\n    <h1>random image ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "random_image", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n    <div id=\"signup\" class=\"span4\">\n      ");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.SignupView", {hash:{
    'controllerBinding': ("SL.signupController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});