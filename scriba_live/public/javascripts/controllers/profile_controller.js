// this is the controller for profile-view-related stuff

SL.ProfileController = Em.Controller.extend({

   // Can be 'home_tab', 'enroll_tab', or 'settings_tab'
  current_tab: 'home_tab', 

  // Schools and classes the user is enrolled in
  home_schools: [],
  home_dinoes:  [],

  // Every school registered with ScribaLive and display information
  all_schools:           [],
  // number of schools per page
  schools_display_count: 5,
  // current page
  schools_display_index: 0,
  num_debug_schools:     200,

  // Can be 'schools', 'years', semseters', or 'dinoes'
  search_state:     'schools', 
  current_school:   null,
  current_semester: null,
  current_year:     null,
  creating_school:  false, 
  creating_class:   false, 

  // Dinoes that belong to the selected school, year, and semester
  filtered_dinoes: [],

  // User information
  current_user_id:         0,
  current_user_first_name: '',
  current_user_last_name:  '',
  current_user_email:      '',

  // Used for updating user settings
  updated_user_first_name: '',
  updated_user_last_name:  '',
  updated_user_email:      '',
  updated_first_name_info: false, 
  updated_last_name_info:  false, 
  updated_email_info:      false, 
  updated_user_info:       false,
  updating_user:           false,
 
  is_home_tab: function(){
    return this.get('current_tab') == 'home_tab';
  }.property('current_tab'),

  is_enroll_tab: function(){
    return this.get('current_tab') == 'enroll_tab';
  }.property('current_tab'),

  is_settings_tab: function(){
    return this.get('current_tab') == 'settings_tab';
  }.property('current_tab'),

  // Every school that is registered to ScribaLive 
  all_schools_list: function(){
    var index           =  SL.profileController.get('schools_display_index');
    var count_per_page  =  SL.profileController.get('schools_display_count');
    return this.get('all_schools').slice(count_per_page*index, count_per_page*(index+1));
  }.property('all_schools.@each.school', 'schools_display_index', 'schools_display_count'),

  // The list of page numbers underneath the list of schools
  school_pages_list: function(){
    var all_schools_len  =  SL.profileController.get('all_schools').length;
    var count_per_page   =  SL.profileController.get('schools_display_count');
    var num_pages        =  Math.ceil(all_schools_len / count_per_page);

    // This could probably be done more efficiently
    var school_pages = [];
    for(var i=1; i<=num_pages; i++){
      var school_page        = new Object();
      school_page.number     = i;
      school_page.is_current = (this.get('current_school_page') == i);

      school_pages.pushObject(school_page);
    }
    return school_pages;
  }.property('all_schools.@each.school', 'schools_display_count', 'current_school_page'),

  current_school_page: function(){
    return this.get('schools_display_index')+1;
  }.property('schools_display_index'),

  // A static list of years
  all_years_list: function(){
    var years = [{title: '2013', type: 'year'},
                 {title: '2014', type: 'year'},
                ];
    return years;
  }.property(),

  // A static list of semesters/seasons
  all_semesters_list: function(){
    var semesters = [{title: 'Summer', type: 'semester'},
                    {title: 'Fall',    type: 'semester'},
                    {title: 'Winter',  type: 'semester'},
                    {title: 'Spring',  type: 'semester'}];
    return semesters;
  }.property(),

  // List of dinoes based on search filter of school, year, and semester
  filtered_dinoes_list: function(){
    return this.get('filtered_dinoes');
  }.property('filtered_dinoes.@each.dino'),

  // My schools
  home_schools_list: function(){
    return this.get('home_schools');
  }.property('home_schools'),

  searching_schools: function(){
    return this.get('search_state') == 'schools';
  }.property('search_state'),

  searching_years: function(){
    return this.get('search_state') == 'years';
  }.property('search_state'),

  searching_semesters: function(){
    return this.get('search_state') == 'semesters';
  }.property('search_state'),

  searching_dinoes: function(){
    return this.get('search_state') == 'dinoes';
  }.property('search_state'),

  show_schools_back_button: function(){
    return SL.profileController.get('schools_display_index') > 0;
  }.property('schools_display_index'),

  show_schools_forward_button: function(){
    var num_schools = SL.profileController.get('all_schools').length;
    count_per_page = SL.profileController.get('schools_display_count');
    index          = SL.profileController.get('schools_display_index');
    return (index+1)*count_per_page < num_schools;
  }.property('all_schools.@each.school', 'schools_display_count', 'schools_display_index'),

  info_first_name: function(){
    if(this.get('updated_user_first_name') != ""){
      SL.profileController.set('updated_first_name_info', true);
      return this.get('updated_user_first_name');
    }
    else{
      SL.profileController.set('updated_first_name_info', false);
      return this.get('current_user_first_name');
    }
  }.property('current_user_first_name', 'updated_user_first_name'),

  info_last_name: function(){
    if(this.get('updated_user_last_name') != ""){
      SL.profileController.set('updated_last_name_info', true);
      return this.get('updated_user_last_name');
    }
    else{
      SL.profileController.set('updated_last_name_info', false);
      return this.get('current_user_last_name');
    }
  }.property('current_user_last_name', 'updated_user_last_name'),

  info_email: function(){
    if(this.get('updated_user_email') != ""){
      SL.profileController.set('updated_email_info', true);
      return this.get('updated_user_email');
    }
    else{
      SL.profileController.set('updated_email_info', false);
      return this.get('current_user_email');
    }
  }.property('current_user_email', 'updated_user_email'),

  has_updated_info: function(){
    var has_updated = false;
    if(this.get('updated_first_name_info') || this.get('updated_last_name_info') || this.get('updated_email_info'))
      has_updated = true;

    return has_updated;
  }.property('updated_first_name_info', 'updated_last_name_info', 'updated_email_info'),

  actions: {
    setTab: function(tab_name){
      SL.profileController.set('current_tab', tab_name);
    },
    toStart: function(){
      SL.profileController.set('search_state', 'schools');
      SL.profileController.set('current_school', null);
      SL.profileController.set('current_year', null);
      SL.profileController.set('current_semester', null);
      SL.profileController.set('filtered_dinoes', []);
    },
    toYear: function(){;
      SL.profileController.set('search_state', 'years');
      SL.profileController.set('current_year', null);
      SL.profileController.set('current_semester', null);
      SL.profileController.set('filtered_dinoes', []);
    },
    toSemester: function(){;
      SL.profileController.set('search_state', 'semesters');
      SL.profileController.set('current_semester', null);
      SL.profileController.set('filtered_dinoes', []);
    },
    setSchoolsPageIndex: function(page){
      // index-1 because actual array starts at 0
      SL.profileController.set('schools_display_index', page.number-1);
    },
    setUpdateUserInfo: function(state){
      SL.profileController.set('updated_user_info', state);
    },
    viewSemestersBySchool: function(school){
      SL.profileController.set('current_school', school);
      SL.profileController.set('search_state', 'years'); 
    },
    viewSemestersByYear: function(year){
      SL.profileController.set('current_year', year);
      SL.profileController.set('search_state', 'semesters');  
    },
    viewDinoesBySemester: function(semester){
      SL.profileController.set('current_semester', semester);
      SL.profileController.set('search_state', 'dinoes');
      SL.profileController.getFilteredDinoes(SL.profileController.get('current_school'),
                                             SL.profileController.get('current_year'),
                                             SL.profileController.get('current_semester'));
    },
    enrollSchool: function(school){

      // Validation: check home_schools to see if already enrolled
      for(var i=0; i<SL.profileController.get('home_schools').length; i++)
      {
        var id = SL.profileController.get('home_schools').objectAt(i).id
        if(school.id == id){
          console.log("Already enrolled in this school");
          return;
        }
      }

      // If not, create via server and push object to home_schools
      var school_id = school.id;
      var user_id   = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/schools/"+school_id,
        data: {user_id: user_id, enroll: true},
        success:function(response){
          var response_school = SL.School.create({
            id:      response.school.id,
            title:   response.school.title, 
            city:    response.school.city, 
            state:   response.school.state, 
            country: response.school.country
          });
            SL.profileController.get('home_schools').pushObject(response_school);
        }
      });
    },
    removeSchool: function(school){
      var user_id = SL.profileController.get('current_user_id');
      //var dinoes_to_remove = [];

      // Start by removing any dinoes associated with this school
      for(var i=0; i<SL.profileController.get('home_dinoes').length; i++)
      {
        var dino = SL.profileController.get('home_dinoes').objectAt(i);

        if(dino.school_id==school.id)
        {
          this.send('removeDino', dino);
          /*console.log("removing a class");
          // Ajax callbacks return too fast, so just push objects to an array
          dinoes_to_remove.pushObject(dino);
          $.ajax({
            type:'POST',
            url:"/dinoes/"+dino.id,
            data: {school_id: school.id, user_id: user_id, enroll: false},
            success:function(response){
              SL.profileController.get('home_dinoes').removeObjects(dinoes_to_remove);
            }
          });*/
        }
      }

      // Now remove the school itself
      $.ajax({
        type:'POST',
        url:"/schools/"+school.id,
        data: {user_id: user_id, enroll: false},
        success:function(response){
          SL.profileController.get('home_schools').removeObject(school);
        }
      });

    },
    enrollDino: function(dino){

      // Validation: check home_dinoes to see if already enrolled
      for(var i=0; i<SL.profileController.get('home_dinoes').length; i++)
      {
        var id = SL.profileController.get('home_dinoes').objectAt(i).id
        if(dino.id == id){
          console.log("Already enrolled in this dino");
          return;
        }
      }

      // Add the school if needed
      var current_school = SL.profileController.get('current_school');
      this.send('enrollSchool', current_school);

      // Create via server and push object to home_schools
      var user_id = SL.profileController.get('current_user_id');
      $.ajax({
        type:'POST',
        url:"/dinoes/"+dino.id,
        data: {user_id: user_id, enroll: true},
        success:function(response){
          var response_dino = SL.Dino.create({
            id:                    response.dino.id,
            school_id:             response.dino.school_id, 
            year:                  response.dino.year,
            semester:              response.dino.semester,
            department:            response.dino.department, 
            course:                response.dino.course, 
            instructor_first_name: response.dino.instructor_first_name, 
            instructor_last_name:  response.dino.instructor_last_name
          });
          SL.profileController.get('home_dinoes').pushObject(response_dino);
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
          SL.profileController.get('home_dinoes').removeObject(dino);
        }
      });
    },
    callCreateSchool: function(){
      SL.profileController.createSchool();
    },
    callCreateDino: function(){
      SL.profileController.createDino();
    },
    updateUser: function(){
      // Get information from text fields
      var updated_first_name = $('#updated_first_name-id');
      var updated_last_name  = $('#updated_last_name-id');
      var updated_email      = $('#updated_email-id');
      var current_user_id    = SL.profileController.get('current_user_id');
      // ADD PASSWORD HERE

      // Make sure all text fields had valid data
      if(updated_first_name.val()=="" || updated_last_name.val()=="" || updated_email.val()==""){
        console.log('Empty parameters');
      }
      else{
        if(SL.profileController.get('updating_user')==true)
          return;
        
        SL.profileController.set('updating_user', true);

        updated_first_name.attr("readonly", true);   
        updated_last_name.attr("readonly", true);   
        updated_email.attr("readonly", true);  

        $.post('/users/'+current_user_id, { 
          first_name: updated_first_name.val(), 
          last_name:  updated_last_name.val(), 
          email:      updated_email.val()
        }, function(response) {
          if(response.success){
            // Update info about user from server's response
            var user = response.user;
            SL.profileController.set('current_user_first_name', user.first_name);
            SL.profileController.set('current_user_last_name', user.last_name);
            SL.profileController.set('current_user_email', user.email);
          }

          // Reset text fields
          updated_first_name.val("");
          updated_last_name.val("");
          updated_email.val("");
          updated_first_name.attr("readonly", false);   
          updated_last_name.attr("readonly", false);   
          updated_email.attr("readonly", false);

          // Reset update info logic controllers
          SL.profileController.set('updated_user_first_name', "");
          SL.profileController.set('updated_user_last_name', "");
          SL.profileController.set('updated_user_email', "");
          SL.profileController.set('updated_first_name_info', false);
          SL.profileController.set('updated_last_name_info', false);
          SL.profileController.set('updated_email_info', false);
          SL.profileController.set('updating_user', false);
        }); 
      }
    },
    schoolsBack: function(){
      index = SL.profileController.get('schools_display_index') - 1;
      SL.profileController.set('schools_display_index', index);
    },
    schoolsForward: function(){
      index = SL.profileController.get('schools_display_index') + 1;
      SL.profileController.set('schools_display_index', index);
    },
  }, // END ACTIONS

  initProfile: function(){
    var controller = SL.get('profileController');

    // Set user information like name, email, etc
    controller.initUser();

    // Prepare arrays for home_tab
    controller.getEnrolledSchools(SL.profileController.get('current_user_id'));
    controller.getDinoesByUser(SL.profileController.get('current_user_id'));

    // Prepare array for enroll_tab
    controller.getAllSchools();
  },
  initUser: function()
  {
    var user_id    = $('#user_id-id');
    var first_name = $('#user_first_name-id');
    var last_name  = $('#user_last_name-id');
    var email      = $('#user_email-id');

    SL.profileController.set('current_user_id', user_id.html());
    SL.profileController.set('current_user_first_name', first_name.html());
    SL.profileController.set('current_user_last_name', last_name.html());
    SL.profileController.set('current_user_email', email.html());

    SL.profileController.set('updated_user_first_name', "");
    SL.profileController.set('updated_user_last_name', "");
    SL.profileController.set('updated_user_email', "");
  },
  debug_fillDatabaseSchools: function(){
    var number = 5000;
    var title = '';
    var city = '';
    var state = '';
    var country = '';

    for(var i=0; i<SL.profileController.get('num_debug_schools'); i++)
    {
      title = "school"+(number+i);
      city = "city"+(number+i);
      state = "state"+(number+i);
      country = "country"+(number+i);

      $.post('/schools', { 
        title:    title, 
        city:     city, 
        state:    state, 
        country:  country 
      }, function(response) {
        if(response.success){
          // Create a new client side school based on server's response school
          var school = SL.School.create({
            id:      response.school.id,
            title:   response.school.title, 
            city:    response.school.city, 
            state:   response.school.state, 
            country: response.school.country
          });
          SL.profileController.get('all_schools').pushObject(school);
        }
      });
    }
  },
  debug_destroyAllSchools: function(){
    /*console.log(SL.profileController.get('all_schools').length);
    for(var i=1; i<=SL.profileController.get('all_schools').length; i++){
      $.ajax({
        type:'DELETE',
        url:"/schools/"+i,
        success: function(response){
          console.log("Deleted school"+i);
        }
      });
    }
    SL.profileController.set('all_schools', []);*/
  },
  createSchool: function(){   //GOOD
    if(SL.profileController.get('creating_school')==true)
      return;
    SL.profileController.set('creating_school', true);

    // Get information from text fields
    var title         = $('#title-id');
    var city          = $('#city-id');
    var state         = $('#state-id');
    var country       = $('#country-id');
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
          var school = SL.School.create({
            id:      response.school.id,
            title:   response.school.title, 
            city:    response.school.city, 
            state:   response.school.state, 
            country: response.school.country
          });
          SL.profileController.get('all_schools').pushObject(school);
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
  createDino: function(){ 
    if(SL.profileController.get('creating_class')==true)
      return;

    SL.profileController.set('creating_class', true);

    // Get information from text fields
    var current_school_id     = SL.profileController.get('current_school').id;
    var current_year          = SL.profileController.get('current_year').title;
    var current_semester      = SL.profileController.get('current_semester').title;
    var department            = $('#department-id');
    var course                = $('#course-id');
    var instructor_first_name = $('#ins_f_n-id');
    var instructor_last_name  = $('#ins_l_n-id');
    var create_class          = $('#create_dino-id');

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
        year:                  current_year,
        semester:              current_semester,
        department:            department.val(), 
        course:                course.val(), 
        instructor_first_name: instructor_first_name.val(), 
        instructor_last_name:  instructor_last_name.val() 
      }, function(response) {
        if(response.success){
          // Create a new client side dino based on server's response dino
          var dino = SL.Dino.create({
            id:                    response.dino.id,
            school_id:             response.dino.school_id, 
            year:                  response.dino.year,
            semester:              response.dino.semester,
            department:            response.dino.department, 
            course:                response.dino.course, 
            instructor_first_name: response.dino.instructor_first_name, 
            instructor_last_name:  response.dino.instructor_last_name
          });
          SL.profileController.get('filtered_dinoes').pushObject(dino);
        }
        // Reset all text fields
        department.val("");
        course.val("");
        instructor_first_name.val("");
        instructor_last_name.val("");
        department.attr("readonly", false);   
        course.attr("readonly", false);   
        instructor_first_name.attr("readonly", false);   
        instructor_last_name.attr("readonly", false); 

        SL.profileController.set('creating_class', false);
      });
    }
  },
  getEnrolledSchools: function(user_id){ 
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
  },
  getAllSchools: function()
  {
    $.ajax({
      type:'GET',
      url:"/schools",
      success:function(response){
        SL.profileController.set('all_schools',[]);
        for(i=0; i<response.schools.length; i++){
          var school = SL.School.create({
            id:      response.schools[i].id,
            title:   response.schools[i].title,
            city:    response.schools[i].city,
            state:   response.schools[i].state,
            country: response.schools[i].country,
          });
          // Populate array with current school
          SL.profileController.get('all_schools').pushObject(school);
        } 
      }
    });
  },
  getFilteredDinoes: function(school, year, semester){
    $.ajax({
      type:'GET',
      url:"/dinoes",
      data: {
        school_id: school.get('id'),
        year:      year.title,
        semester:  semester.title,
      },
      success: function(response){
        SL.profileController.set('filtered_dinoes',[]);
        for(i=0; i<response.dinoes.length; i++){
          var dino = SL.Dino.create({
            id:                    response.dinoes[i].id,
            year:                  response.dinoes[i].year,
            semester:              response.dinoes[i].semester,
            department:            response.dinoes[i].department,
            course:                response.dinoes[i].course,
            instructor_first_name: response.dinoes[i].instructor_first_name,
            instructor_last_name:  response.dinoes[i].instructor_last_name,
          });
          SL.profileController.get('filtered_dinoes').pushObject(dino);
        }
      }
    });
  },
  getDinoesByUser: function(user_id){
    $.ajax({
      type:'GET',
      url:"/dinoes",
      data: {user_id: user_id},
      success: function(response){
        SL.profileController.set('home_dinoes', []); // empty array because we will refill it
        for(i=0; i<response.dinoes.length; i++){
          var dino = SL.Dino.create({
            id:                    response.dinoes[i].id,
            year:                  response.dinoes[i].year,
            semester:              response.dinoes[i].semester,
            department:            response.dinoes[i].department,
            course:                response.dinoes[i].course,
            instructor_first_name: response.dinoes[i].instructor_first_name,
            instructor_last_name:  response.dinoes[i].instructor_last_name,
          });
          SL.profileController.get('home_dinoes').pushObject(dino);
        }
      }
    });
  },
});
