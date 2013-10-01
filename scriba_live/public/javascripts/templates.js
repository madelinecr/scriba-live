Ember.TEMPLATES["views/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<p>This is the index</p>");
  
});

Ember.TEMPLATES["views/layout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes;


  data.buffer.push("<!DOCTYPE html>\n<html>\n<head>\n  <title>ScribaLive</title>\n  <script src=\"/javascripts/jquery-2.0.3.js\"></script>\n  <script src=\"/javascripts/handlebars-1.0.0.js\"></script>\n  <script src=\"/javascripts/ember.prod.js\"></script>\n  <script src=\"/javascripts/templates.js\"></script>\n  <script src=\"/javascripts/scriba.js\"></script>\n</head>\n\n<body>\n  ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "body", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</body>\n</html>");
  return buffer;
  
});

Ember.TEMPLATES["views/scriptsView"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});