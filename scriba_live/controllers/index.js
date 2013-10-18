/*
 * This file must have all controllers required or they will not be seen by node
 */

var controllers = {

  // require new controllers here
  // name: require('name_controller')
  site: require('./site_controller'),
  users: require('./users_controller'),
  sessions: require('./sessions_controller'),
  notes: require('./notes_controller'),
  io: require('./io_controller')

}

module.exports = controllers;
