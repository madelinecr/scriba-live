// this is the controller for signin-related stuff

SL.SigninController = Em.Controller.extend({

  actions: {   
    login: function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();
      
      SL.signinController.validateLogin(username, password);
      
    }
  },
  
  validateLogin: function(username, password){
    var data = {
      username: username, 
      password: password
    }
            
    $.ajax({
      type: "POST",
      url: '/login',
      data: {
        username: username,
        password: password
      },
      success: function(data)
      {
         if (data === '???') {
           window.location.replace('/home');
         }
         else {
           alert(data);
         }
       }
     });


 SL.profileController.set('username', response.username)
    /*

    $.post('/login', data, function(response){
      if(response.success){
        //window.location = '/home';
      }
      else{
        alert(response.error);
      }
      console.log(response);
    });  */
  }

});
