/*
  This is the dinoes controller which controls classes-related data (Ex: CSCI430 or EECE320)
*/


/*
  GET list of (multiple) classes in JSON.
*/

exports.index = function(req, res){

  // try $.get('/dinoes', { ids: [1,2,3] }, function(response) {console.log(response)})
  // you can use req.body.ids to get the passed ids

  if(req.query.school_id != undefined){
    req.app.get('db').School.find(req.query.school_id).success(function(school){
      if(school){
        // query database for dinoes
        school.getDinoes().success(function(dinoes){

           // filter dinoes by the correct year and semester
          var filtered_dinoes = [];
          for(var i=0; i<dinoes.length; i++)
            //console.log(dinoes[i].year);
            if(req.query.semester==dinoes[i].semester && req.query.year==dinoes[i].year){
              filtered_dinoes.push(dinoes[i]);
            }

            res.send({
            success: true,
            dinoes: filtered_dinoes,
          });
        });
      }
      else{
        res.send({
          success: false
        });
      }
    });
  }
  else if(req.query.user_id != undefined){
    req.app.get('db').User.find(req.query.user_id).success(function(user){
      if(user){
        user.getDinoes().success(function(dinoes){
          res.send({
            success: true,
            dinoes: dinoes
          });
        });
      }
      else{
        res.send({
          success: false
        });
      }
    });

  }
  else{
    req.app.get('db').Dino.findAll().success(function(dinoes){
      // if no errors, send dinoes (dinoes == zero length array if no matches)

      res.send({
        success: true,
        dinoes: dinoes
      });

    }).error(function(error){
      // if error, send error w/ request params

      res.send({
        success: false,
        error: error
      });
    });
  }
};

/*
  GET (single) dino in JSON
*/

exports.show = function(req, res){
  // try $.get('/dinoes/1', function(response) {console.log(response)}) in javascript console
  
  // query database for dino
  req.app.get('db').Dino.find(req.params.id).success(function(dino){
    // if no errors, send dino (dino == null if it doesn't exist)
    res.send({
      success: true,
      dino: dino
    });

  }).error(function(error){
    // if error, send error w/ request params

    res.send({
      success: false,
      error: error
    });
  });

}

/*
  POST create new dino & return result
*/

exports.create = function(req, res) {
   // try $.post('/dinoes', { department: 'CSCI', course: '430', instructor_first_name: 'David', instructor_last_name: 'Zeichick', days: '42', start_time: '11', end_time:'11.8333'}, function(response) {console.log(response)}) in javascript console
  // you can use req.body.days / req.body.end_time to get passed days / end_time.

  // To create a dino you must get the db out of the app object "req.app.get('db')"
  // you then reference the Dino model and call .create({ paramaters})
  // .success( function(dino) { ... }) is called on a success and the created dino is passed
  // .error(function(error) { ... }) is called when an error occurs and the error is passed
  req.app.get('db').Dino.create({
    year:                  req.body.year,
    semester:              req.body.semester,
    department:            req.body.department,
    course:                req.body.course,
    instructor_first_name: req.body.instructor_first_name,
    instructor_last_name:  req.body.instructor_last_name, 

  }).success(function(dino) {
     
    if(req.body.school_id != undefined){
      req.app.get('db').School.find(req.body.school_id).success(function(current_school){
      
        current_school.addDino(dino); 
        res.send({
          success: true,
          dino: dino
        });

      });
    }

  }).error(function(error){
    // if an error occurs
    res.send({
      success: false,
      error: error
    });

  });

}


/*
  POST update existing (single) dino
*/

exports.update = function(req, res) {
  // try $.post('/dinoes/1', { department: 'CSCI', course: '430', instructor_first_name: 'David', instructor_last_name: 'Zeichick', days: '42', start_time: '11', end_time:'11.8333'}, function(response) {console.log(response)}) in javascript console
  
  if(req.params.id){
    console.log(req.params.id);
    req.app.get('db').Dino.find(req.params.id).success(function(dino) {
      if (dino) {
        if(!req.body.user_id){
          
          dino.updateAttributes({
            year:                  req.body.year,
            semester:              req.body.semester,
            department:            req.body.title,
            course:                req.body.course, 
            instructor_first_name: req.body.instructor_first_name,
            instructor_last_name:  req.body.instructor_last_name, 
          }).success(function(dino) {
            res.send({
              success: true,
              dino: dino
            });
          }).error(function(error){
            res.send({
              success: false,
              error: error
            });
          });

        }
        else // user_id exists, remove this dino from user
        {
          /*// Remove dino from school
          if(req.body.school_id && !req.body.enroll)
          {
            console.log("Hola2");
            req.app.get('db').School.find(req.body.school_id).success(function(school){
              school.removeDino(dino);
            console.log("Hola3");
              res.send({
                success: true,
              });
            });
          }*/


          req.app.get('db').User.find(req.body.user_id).success(function(user){
            // Do we want to add or drop this class?

            if(req.body.enroll=='true')
              dino.addUser(user);
            else
              dino.removeUser(user);

            res.send({
              success: true,
              dino: dino
            });
          }).error(function(error){
            res.send({
              success: false,
              error: error
            });
          });
        }
      }
    }).error(function(error){
      res.send({
        success: false,
        error: error
      });
    });
  }
}

/*
  DELETE destroy existing (single) dino
*/

exports.destroy = function(req, res) {

  // try: $.ajax({ url: '/dinoes/1', type: 'DELETE' }, function(response){ console.log(response)}) in the javascript console
  // in the url: '/dinoes/1' the '1' is the id of the dino to be destroyed, if he doesn't exist anymore then it will throw
  // an error. Try creating a dino then deleting it.

  // fetch dino
  req.app.get('db').Dino.find(req.params.id).success(function(dino) {

    // if dino exists
    if (dino) {
      dino.destroy().success(function(dino) {
        res.send({
          success: true,
          dino: dino
        });
      }).error(function(error){
        res.send({
          success: false,
          error: error
        });
      });
    }
  }).error(function(error){
    res.send({
      success: false,
      error: error
    });
  });


}


