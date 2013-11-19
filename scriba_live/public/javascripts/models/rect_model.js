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

  update: function(push) {
    this.set('x_pos', this.object.attr('x'));
    this.set('y_pos', this.object.attr('y'));
    this.set('width', this.object.attr('width'));
    this.set('height', this.object.attr('height'));

    // push to server
    if (push == 'push') {
      SL.ioController.pushRectUpdate(this);
    }
  },

  save: function() {
    // save to server
    SL.ioController.pushRectCreate(this);
  },

  remove: function(push) {
    // delete raphael object
    var rg_obj = this.get('object');
    this.set('object', null);
    rg_obj.remove();

    // remove from server
    if (push == 'push') {
      SL.ioController.pushRectDestroy(this);
    }

    // remove this object
    this.destroy();
  }
});
