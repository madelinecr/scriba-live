// this is the controller for signin-related stuff

SL.SigninController = Em.Controller.extend({

  loginFailed: false,

  signin: function() {
    console.log("signin called");
    console.log( $("#signin_email").val() );
    $.post("/signin", {
      signin_email: $("#signin_email").val(),
      signin_password: $("#signin_password").val()
    },function(response) {
      console.log(response);
      document.location = "/preferences";
    }).fail(function() {
      console.log("setting loginFailed to true");
      SL.signinController.set('loginFailed', true);
    });
    //alert("signin button pressed");
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
    }
  }
});
