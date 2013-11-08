SL.Router.map(function() {
  this.resource("users", { path: "/users" }, function() {
    this.route('new');
  });
  this.route("user", { path: "/user/:user_id" });
  this.route("welcome", { path: "/" });
  //this.route("favorites", { path: "/favs" });
});

SL.UsersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});
