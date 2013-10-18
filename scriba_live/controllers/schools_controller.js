/*
  This is the schools controller which controls school-related data (Ex: CSU, Chico or Cal Poly SLO)
*/


/*
  GET list of (multiple) schools in JSON.
*/

exports.index = function(req, res){

  // try $.get('/schools', { ids: [1,2,3] }, function(response) {console.log(response)})

  // query database for school
  req.app.get('db').School.findAll( { where: { id: req.query.id } }).success(function(schools){
    // if no errors, send schools (schools == zero length array if no matches)

    res.send({
      success: true,
      schools: schools
    });

  }).error(function(error){
    // if error, send error w/ request params

    res.send({
      success: false,
      error: error
    });
  });

};

/*
  GET (single) school in JSON
*/

exports.show = function(req, res){
  // try $.get('/schools/1', function(response) {console.log(response)}) in javascript console
  
  // query database for school
  req.app.get('db').School.find(req.params.id).success(function(school){
    // if no errors, send dino (school == null if it doesn't exist)
    res.send({
      success: true,
      school: school
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
  POST create new school & return result
*/

exports.create = function(req, res) {
   // try $.post('/schools', { title: 'CSU, Chico', city: 'Chico', state: 'California', country: 'Amurica' }, function(response) {console.log(response)}) in javascript console

  req.app.get('db').School.create({

    title: req.body.title,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country

  }).success(function(school) {
    // if successfully inserted into database
    res.send({
      success: true,
      school: school
    });

  }).error(function(error){
    // if an error occurs
    res.send({
      success: false,
      error: error
    });

  });

}


/*
  POST update existing (single) school
*/

exports.update = function(req, res) {
   // try $.post('/schools', { title: 'CSU, Chico', city: 'Chico', state: 'California', country: 'Amurica' }, function(response) {console.log(response)}) in javascript console

  // fetch school
  req.app.get('db').School.find(req.params.id).success(function(school) {

    // if school exists
    if (school) {

      // try to update school
      school.updateAttributes({

        title: req.body.title,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country

      }).success(function(school) {
        // if successfully updated in database

        res.send({
          success: true,
          school: school
        });

      }).error(function(error){
        // if an error occurs

        res.send({
          success: false,
          error: error
        });

      });
    }
  }).error(function(error){
    // in the error / failure callback function return error

    res.send({
      success: false,
      error: error
    });
  });

}


/*
  DELETE destroy existing (single) school
*/

exports.destroy = function(req, res) {

  // try: $.ajax({ url: '/school/1', type: 'DELETE' }, function(response){ console.log(response)}) in the javascript console
  // in the url: '/schools/1' the '1' is the id of the school to be destroyed, if it doesn't exist anymore then it will throw
  // an error. Try creating a school then deleting it.

  // fetch school
  req.app.get('db').School.find(req.params.id).success(function(school) {

    // if school exists
    if (school) {

      // attempt to destroy dino
      school.destroy().success(function(school) {

        // if successfully deleted
        res.send({
          success: true,
          school: school
        });

      }).error(function(error){
        // if an error occurs

        res.send({
          success: false,
          error: error
        });

      });
    }

  }).error(function(error){
    // in the error / failure callback function return error

    res.send({
      success: false,
      error: error
    });
  });


}


