// this is the controller for profile-view-related stuff

SL.ProfileController = Em.Controller.extend({

  actions: {
    findClass: function(){
      var classSearch = $('#find-class').val();
     
      $.ajax({
        type:'GET',
        url:"/dinoes/"+classSearch,
        //data: classSearch,
        success:function(data){
          console.log(data));
        }
      });
 
      //$.get('/dinoes', {classSearch}, function(response) {
      //  console.log(response.department)
      //});
    },

    //createClass: function(){      
    //}
  }

});
