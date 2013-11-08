// this is the controller for profile-view-related stuff

SL.ProfileController = Em.ArrayController.extend({

  current_tab: 'home_tab',
  current: 'schools', // 'schools', 'semseters', 'dinoes'
  schools: [],
  semesters: [],
  dinoes: [],
  current_user_id: 0,
  current_school: null,
  current_semester: null,
  creating_school: false, 
  creating_class: false, 
  home_schools: [],
  home_dinoes: [],

  current_list: function(){
    var current = this.get('current');
    return this.get(current);
  }.property('current', 'schools', 'dinoes'),

  semesters: function(){
    // Uncomment before next database reset
    //var semesters = [{title: 'Summer', type: 'semester'},
    //                 {title: 'Fall',   type: 'semester'},
    //                 {title: 'Winter', type: 'semester'},
    //                 {title: 'Spring', type: 'semester'}];
    var semesters = [{title: 'Summer', type: 'semester'},
                     {title: 'Fall',   type: 'semester'},
                     {title: 'Winter', type: 'semester'},
                     {title: 'Spring', type: 'semester'}];
    return semesters;
  }.property(),

  is_school: function(){
    return this.get('current') == 'schools';
  }.property('current'),

  is_semester: function(){
    return this.get('current') == 'semesters';
  }.property('current'),

  is_dino: function(){
    return this.get('current') == 'dinoes';
  }.property('current'),

  is_home: function(){
    return this.get('current_tab') == 'home_tab';
  }.property('current_tab'),

  is_enroll: function(){
    return this.get('current_tab') == 'enroll_tab';
  }.property('current_tab'),

  is_settings: function(){
    return this.get('current_tab') == 'settings_tab';
  }.property('current_tab'),

  actions: {
    setTab: function(tab_name){
      SL.profileController.set('current_tab', tab_name);

      // Reload home schools and dinoes
      if(SL.profileController.get('current_tab')==="home_tab")
      {
        SL.profileController.getSchools(SL.profileController.get('current_user_id'));
        SL.profileController.getDinoes(null, SL.profileController.get('current_user_id'));
      }
    },
    toStart: function(){
      SL.profileController.set('current', 'schools');
      //SL.profileController.set('semesters', []);
      SL.profileController.set('dinoes', []);
      SL.profileController.set('current_school', null);
      SL.profileController.set('current_semester', null);
    },
    toSemester: function(){;
      SL.profileController.set('current', 'semesters');
      SL.profileController.set('current_semester', null);
      SL.profileController.set('dinoes', []);
    },
    addCurrent: function(obj){
      // should event to figure out what was clicked
      
      // Get objects from server based on current state of list
      var current = SL.profileController.get('current');
      if(current == 'schools'){
        SL.profileController.set('current_school', obj);
        SL.profileController.set('current', 'semesters'); // ++
      }
      else if(current == 'semesters'){
        SL.profileController.set('current_semester', obj);
        SL.profileController.set('current', 'dinoes');    // ++
        SL.profileController.getDinoes(SL.profileController.get('current_school'));
      }
      else if(current == 'dinoes'){
        SL.profileController.set('current_dino', obj);
      }
      else{
        console.log("Error with current state of list");
      }
    },
    joinSchool: function(school){
      var school_id = school.id;
      var user_id   = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/schools/"+school_id,
        data: {user_id: user_id, join: true},
        success:function(response){
          SL.profileController.get('home_schools').pushObject(response.school);
        }
      });
    },
    enrollDino: function(dino){
      var current_school = SL.profileController.get('current_school');
      console.log("Just called enroll dino");
      this.send('joinSchool', current_school);

      var dino_id = dino.id;
      console.log(dino);
      var user_id = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/dinoes/"+dino_id,
        data: {user_id: user_id, enroll: true},
        success:function(response){
          console.log("Adding");
          console.log(response.dino);
          SL.profileController.get('home_dinoes').pushObject(response.dino);
        }
      });
    },
    removeSchool: function(school){
      var school_id = school.id;
      var user_id = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/schools/"+school_id,
        data: {user_id: user_id, join: false},
        success:function(response){
          SL.profileController.getSchools(SL.profileController.get('current_user_id'));
        }
      });
    },
    removeDino: function(dino){
      var dino_id = dino.id;
      var user_id = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/dinoes/"+dino_id,
        data: {user_id: user_id, enroll: false},
        success:function(response){
          SL.profileController.getDinoes(null, SL.profileController.get('current_user_id'));
        }
      });
    },
    createSchool: function(){
      if(SL.profileController.get('creating_school')==true)
        return;

      SL.profileController.set('creating_school', true);

      // Get information from text fields
      var title = $('#title-id');
      var city = $('#city-id');
      var state = $('#state-id');
      var country = $('#country-id');
      var create_school = $('#create_school-id');

      // Make sure all text fields had valid data
      if(title.val()=="" || city.val()=="" || state.val()=="" || country.val()==""){
        console.log('Empty parameters');
      }
      else{
        title.attr("readonly", true);   
        city.attr("readonly", true);   
        state.attr("readonly", true);   
        country.attr("readonly", true);   
        $.post('/schools', { 
          title:    title.val(), 
          city:     city.val(), 
          state:    state.val(), 
          country:  country.val() 
        }, function(response) {
          if(response.success){
            // Create a new client side dino based on server's response dino
            var school = SL.School.create({
              id:      response.school.id,
              title:   response.school.title, 
              city:    response.school.city, 
              state:   response.school.state, 
              country: response.school.country
            });
            SL.profileController.get('schools').pushObject(school);
          }
          // Reset all text fields for class creation
          SL.profileController.set('creating_school', false);
          title.val("");
          city.val("");
          state.val("");
          country.val("");
          title.attr("readonly", false);   
          city.attr("readonly", false);   
          state.attr("readonly", false);   
          country.attr("readonly", false);   
        });
      }
    }, 
    createClass: function(){
      if(SL.profileController.get('creating_class')==true)
        return;

      SL.profileController.set('creating_class', true);

      // Get information from text fields
      var current_school_id = SL.profileController.get('current_school').id;
      var current_semester = SL.profileController.get('current_semester').title;
      var department = $('#department-id');
      var course = $('#course-id');
      var instructor_first_name = $('#ins_f_n-id');
      var instructor_last_name = $('#ins_l_n-id');
      var create_class = $('#create_class-id');

      // Make sure all text fields had valid data
      if(department.val()=="" || course.val()=="" || instructor_first_name.val()=="" || instructor_last_name.val()==""){
        console.log('Empty parameters');
      }
      else{
        department.attr("readonly", true);   
        course.attr("readonly", true);   
        instructor_first_name.attr("readonly", true);   
        instructor_last_name.attr("readonly", true);   
        $.post('/dinoes', { 
          school_id:             current_school_id, 
          semester:              current_semester,
          department:            department.val(), 
          course:                course.val(), 
          instructor_first_name: instructor_first_name.val(), 
          instructor_last_name:  instructor_last_name.val() 
        }, function(response) {
          if(response.success){
            // Create a new client side dino based on server's response dino
            var dino = SL.Dino.create({
              school_id:             response.dino.school_id, 
              semester:              response.dino.semester,
              department:            response.dino.department, 
              course:                response.dino.course, 
              instructor_first_name: response.dino.instructor_first_name, 
              instructor_last_name:  response.dino.instructor_last_name
            });
            console.log(dino);
            SL.profileController.get('dinoes').pushObject(dino);
          }
          // Reset all text fields for class creation
          SL.profileController.set('creating_class', false);
          department.val("");
          course.val("");
          instructor_first_name.val("");
          instructor_last_name.val("");
          department.attr("readonly", false);   
          course.attr("readonly", false);   
          instructor_first_name.attr("readonly", false);   
          instructor_last_name.attr("readonly", false);  
        SL.profileController.getDinoes(SL.profileController.get('current_school')); 
        });
      }
    },
  }, //end actions

  initProfile: function(){
    var controller = SL.get('profileController');
    controller.set('current_user_id', 1);
    controller.getSchools();
    controller.getSchools(controller.get('current_user_id'));
    controller.getDinoes(null, controller.get('current_user_id'));
  },
  getSchools: function(user_id){
    if(user_id==undefined){
      $.ajax({
      type:'GET',
        url:"/schools",
        success:function(response){
          SL.profileController.set('schools',[]);
          for(i=0; i<response.schools.length; i++){
            var school = SL.School.create({
              id:      response.schools[i].id,
              title:   response.schools[i].title,
              city:    response.schools[i].city,
              state:   response.schools[i].state,
              country: response.schools[i].country,
            });
            // Populate array with current school
            SL.profileController.get('schools').pushObject(school);
          } 
        }
      });
    }
    else{
      //we have user id
      $.ajax({
        type:'GET',
        url:"/schools",
        data: {user_id: user_id},
        success:function(response){
          SL.profileController.set('home_schools',[]);
          for(i=0; i<response.schools.length; i++){
            var school = SL.School.create({
              id:      response.schools[i].id,
              title:   response.schools[i].title,
              city:    response.schools[i].city,
              state:   response.schools[i].state,
              country: response.schools[i].country,
            });
            // Populate array with current school
            SL.profileController.get('home_schools').pushObject(school);
          }
        }
      });
    }   
  },
  getDinoes: function(school, user_id) {
    if(user_id==undefined){
      // Get dinoes from current school
      $.ajax({
        type:'GET',
        url:"/dinoes",
        data: {
          school_id: school.get('id'),
          semester:  SL.profileController.get('current_semester').title,
        },
        success: function(response){
          var profileController = SL.get('profileController');
          SL.profileController.set('dinoes',[]);
          for(i=0; i<response.dinoes.length; i++){
            var dino = SL.Dino.create({
              // Could make this more efficient
              id:                    response.dinoes[i].id,
              department:            response.dinoes[i].department,
              semester:              response.dinoes[i].semester,
              course:                response.dinoes[i].course,
              instructor_first_name: response.dinoes[i].instructor_first_name,
              instructor_last_name:  response.dinoes[i].instructor_last_name,
            });
            // Populate array with current dinosaur
            profileController.get('dinoes').pushObject(dino);
          }
        }
      });
    }
    else{
      // Get dinoes that current user is enrolled in
      $.ajax({
        type:'GET',
        url:"/dinoes",
        data: {user_id: user_id},
        success: function(response){
          var profileController = SL.get('profileController');
          profileController.set('home_dinoes', []); // empty array because we will refill it
          for(i=0; i<response.dinoes.length; i++){
            var dino = SL.Dino.create({
              id:                    response.dinoes[i].id,
              department:            response.dinoes[i].department,
              semester:              response.dinoes[i].semester,
              course:                response.dinoes[i].course,
              instructor_first_name: response.dinoes[i].instructor_first_name,
              instructor_last_name:  response.dinoes[i].instructor_last_name,
            });
            // Populate array with current dinosaur
            profileController.get('home_dinoes').pushObject(dino);
          }
        }
      });
    }
  },
});
