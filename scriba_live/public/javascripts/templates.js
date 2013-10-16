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

Ember.TEMPLATES["signin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<p>This is the signin template, put relevent textfields here</p>");
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<p>This is the signup template, put relevent textfields here</p>");
  
});

Ember.TEMPLATES["users"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n  <p>My name is ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["welcome"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<h>WELCOME!</h>\n\n");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.SigninView", {hash:{
    'controllerBinding': ("SL.signinController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  hashContexts = {'controllerBinding': depth0};
  hashTypes = {'controllerBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "SL.SignupView", {hash:{
    'controllerBinding': ("SL.signupController")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});