// this is the controller for signin-related stuff

SL.SigninController = Em.Controller.extend({

  loginFailed: false,

  actions: {
  
    submitSignin: function() {
      SL.signinController.signin();
    }
  },

  signin: function() {
    $.post("/signin", {
      username: this.get("signin_username"),
      password: this.get("signin_password")
    },function(reponse) {
      alert("signed in");
      document.location = "/preferences";
    });
  },

});
