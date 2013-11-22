// this is the controller for signup-related stuff

SL.UsersNewController = Em.Controller.extend({

  createError: false,

  actions: {
    createUser: function() {
      this.validate();
      var email = $("input[name='email']").val();
      var password = $("input[name='password']").val();
      $.post("/users", {
        first_name: $(".firstname").val(),
        last_name: $(".lastname").val(),
        email: email,
        password: password,
        password_confirmation: $("input[name='password_confirmation']").val()
      },function(response) {
        console.log(response);
        if(response.success == true) {
          $.post("/signin", {
            signin_email: email,
            signin_password: password
          },function(response) {
            document.location = "/preferences";
          });
          SL.usersNewController.set('createSuccess', true);
        } else {
          console.log("Error: " + response);
          SL.usersNewController.set('createError', true);
        }
      });
    }
  },

  validate: function() {
    console.log("validations running..");
    this.validateName();
    this.validateEmail();
    this.validatePassword();
  },

  validateName: function() {
    firstname = $(".firstname");
    lastname = $(".lastname");
    if(firstname.val() == "") {
      firstname.parent().addClass("has-error");
    } else {
      firstname.parent().removeClass("has-error");
    }
    if(lastname.val() == "") {
      lastname.parent().addClass("has-error");
    } else {
      lastname.parent().removeClass("has-error");
    }
  },

  validateEmail: function() {
    email = $("input[name='email']");
    if(email.val() == "") {
      email.parent().addClass("has-error");
    } else {
      email.parent().removeClass("has-error");
    }
  },

  validatePassword: function() {
    password = $("input[name='password']");
    password_confirm = $("input[name='password_confirmation']");
    if(password.val() == "") {
      password.parent().addClass("has-error");
    } else {
      password.parent().removeClass("has-error");
    }
    if(password_confirm.val() == "") {
      password_confirm.parent().addClass("has-error");
    } else {
      password_confirm.parent().removeClass("has-error");
    }
  },
});
