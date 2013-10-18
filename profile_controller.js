// this is the controller for profile-view-related stuff

SL.ProfileController = Em.Controller.extend({

  current: 'school', // 'school', 'semseter', 'class'

  current_school: null,
  current_semester: null,
  current_class: null,

  actions: {
    findCurrent: function(){
      var current = SL.profileController.get('current');

      if (currrent == 'school' ) {
        SL.profileController.getSchool();
      }
      var schoolName = $('#search-field').val();
       
      var data = {
        
      }	
 
      $.ajax({
        type:'GET',
        //  "/dinoes/value"
	url:"/dinoes/"+classQuery,
        data: data,
        success:function(response){
          console.log(response);
        }
      });
 
      //$.get('/dinoes', {classSearch}, function(response) {
      //  console.log(response.department)
      //});
    },

    getSchool: function(name) {

    }

    //createClass: function(){      
    //}
  }

});
