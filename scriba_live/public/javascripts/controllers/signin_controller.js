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
    });//, function() {
      //this.set("loginFailed", true);
    //}.bind(this));
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
=======
    });
  },

>>>>>>> origin/s1_site_profile
});
