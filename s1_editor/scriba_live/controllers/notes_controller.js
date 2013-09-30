/*
 * This is the notes controller which controls notes-related data
 * Real-time path / shape / text data must be served through socket.io
 */


/*
 * GET list of (multiple) notes in JSON (metadata only).
 */

exports.index = function(req, res){
  // try $.get('/notes', { ids: [1,2,3] }, function(response) {console.log(response)})
  // you can use req.body.ids to get the passed ids

  // notes metadata, may have nested 'day' data instead of day_id & same for user
  var notes = [
    { id: 1,
      title: 'Integrals',
      day_id: 32,
      user_id: 1 },
    { id: 2,
      title: 'Ghandi',
      day_id: 23,
      user_id: 2 },
    { id: 3,
      title: 'Integrals',
      day_id: 32,
      user_id: 2 },
  ];

  // place users in data object with success set to true
  var data = {
    notes: notes,
    success: true
  }

  res.send(data);
};

/*
 * GET (single) note in JSON (meta-data only)
 */

exports.show = function(req, res){
 // try $.get('/notes/1', function(response) {console.log(response)}) in javascript console

  // this is a single object containing note metadata
  var note = {
    id: 1,
    title: 'Integrals',
    day_id: 32,
    user_id: 1
  }

  // place note in data object with success set to true
  var data = {
    note: note,
    success: true
  }

  res.send(data);
};