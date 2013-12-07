// this is the controller for signin-related stuff

SL.SigninController = Em.Controller.extend({

  loginFailed: false,
  resetSent: false,
  resetEmpty: false,
  resetFailed: false,

  signin: function() {
    $.post("/signin", {
      signin_email: $("#signin_email").val(),
      signin_password: $("#signin_password").val()
    },function(response) {
      document.location = "/preferences";
    }).fail(function() {
      SL.signinController.set('loginFailed', true);
    });
    //alert("signin button pressed");
  },

  resetPassword: function() {
    var email = $("#reset-pass-email").val();
    console.log(email);
    SL.signinController.set('resetFailed', false);
    SL.signinController.set('resetEmpty', false);
    SL.signinController.set('resetSent', false);

    if(email == "") {
      SL.signinController.set('resetEmpty', true);
    } else {
      $.get("/reset_password/" + email,function(response) {
        if(response.success == true) {
          SL.signinController.set('resetSent', true);
          console.log("Password reset.);
        } else {
          SL.signinController.set('resetFailed', true);
          console.log("Password not reset.");
        }
      });
    }
  },

//  actions: {   
//    login: function() {
//      var username = $('#login-username').val();
//      var password = $('#login-password').val();
//      
//      SL.signinController.validateLogin(username, password);
//      
//    }
//  },
//  
//  validateLogin: function(username, password){
//    var data = {
//      username: username, 
//      password: password
//    }
//            
//    $.ajax({
//      type: "POST",
//      url: '/login',
//      data: {
//        username: username,
//        password: password
//      },
//      success: function(data)
//      {
//         if (data === '???') {
//           window.location.replace('/home');
//         }
//         else {
//           alert(data);
//         }
//       }
//     });
//
//
// SL.profileController.set('username', response.username)
//    /*
//
//    $.post('/login', data, function(response){
//      if(response.success){
//        //window.location = '/home';
//      }
//      else{
//        alert(response.error);
//      }
//      console.log(response);
//    });  */
//  } 
  actions: {
  
    submitSignin: function() {
      SL.signinController.signin();
    },
    resetPassword: function() {
      SL.signinController.resetPassword();
    }
  }
});
