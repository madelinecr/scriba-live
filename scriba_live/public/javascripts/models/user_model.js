var attr = DS.attr;

SL.User = DS.Model.extend({
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string') 
});
