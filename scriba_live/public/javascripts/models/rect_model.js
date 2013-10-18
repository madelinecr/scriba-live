SL.Rect = Em.Object.extend({
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
    this.set('x_pos', this.object.attr('x'));
    this.set('y_pos', this.object.attr('y'));
    this.set('width', this.object.attr('width'));
    this.set('height', this.object.attr('height'));
  },

  save: function () {
    //save to server here
    SL.ioController.pushRectCreate(this);
  },

  remove: function() {
    // delete raphael object
    var raph_object = this.get('object');
    this.set('object', null);
    raph_object.remove();

    // remove from server
    SL.ioController.pushRectDestroy(this);

    // remove this object
    this.destroy();
  }
});
