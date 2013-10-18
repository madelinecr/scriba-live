SL.Oval = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  x_pos: 0,
  y_pos: 0,
  width: 0,
  height: 0,
  object: null,

  element_id: function() {
    return this.get('object').node.id;
  }.property('this.object.node.id'),

  update: function() {
    this.set('x_pos', this.object.attr('cx'));
    this.set('y_pos', this.object.attr('cy'));
    this.set('width', this.object.attr('rx'));
    this.set('height', this.object.attr('ry'));

    // push to server here
  },

  save: function() {
    // save to server here
  },

  remove: function() {
    // delete raphael object
    var raph_object = this.get('object');
    this.set('object', null);
    raph_object.remove();

    // remove from server

    // remove this object
    this.destroy();
  }
});
