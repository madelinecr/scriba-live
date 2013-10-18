/*
  This is the dinoes controller which controls classes-related data (Ex: CSCI430 or EECE320)
*/


/*
  GET list of (multiple) classes in JSON.
*/

exports.index = function(req, res){

  // try $.get('/dinoes', { ids: [1,2,3] }, function(response) {console.log(response)})
  // you can use req.body.ids to get the passed ids

  // query database for dino
  req.app.get('db').Dino.findAll( { where: { id: req.query.id } }).success(function(dinoes){
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

    department: req.body.department,  // (e.g. CSCI)
    course: req.body.course,  // (e.g. 430)
    instructor_first_name: req.body.instructor_first_name,
    instructor_last_name: req.body.instructor_last_name, 
    days: req.body.days, 
    start_time: req.body.start_time,
    end_time: req.body.end_time

  }).success(function(dino) {
    // if successfully inserted into database
    res.send({
      success: true,
      dino: dino
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
  POST update existing (single) dino
*/

exports.update = function(req, res) {
  // try $.post('/dinoes', { department: 'CSCI', course: '430', instructor_first_name: 'David', instructor_last_name: 'Zeichick', days: '42', start_time: '11', end_time:'11.8333'}, function(response) {console.log(response)}) in javascript console

  // fetch dino
  req.app.get('db').Dino.find(req.params.id).success(function(dino) {

    // if dino exists
    if (dino) {

      // try to update dino
      dino.updateAttributes({

        department: req.body.title,
        course: req.body.course, 
        instructor_first_name: req.body.instructor_first_name,
        instructor_last_name: req.body.instructor_last_name, 
        days: req.body.days, 
        start_time: req.body.start_time,
        end_time: req.body.end_time

      }).success(function(dino) {
        // if successfully updated in database

        res.send({
          success: true,
          dino: dino
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

      // attempt to destroy dino
      dino.destroy().success(function(dino) {

        // if successfully deleted
        res.send({
          success: true,
          dino: dino
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


