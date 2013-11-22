SL.Rect = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  x_pos: 0,
  y_pos: 0,
  width: 0,
  height: 0,
  fill_color: "",
  fill_alpha: "",
  line_width: "",
  line_color: "",
  object: null,

  element_id: function() {
    return this.get('object').node.id;
  }.property('this.object.node.id'),

  update: function(push) {
    this.set('x_pos', this.object.attr('x'));
    this.set('y_pos', this.object.attr('y'));
    this.set('width', this.object.attr('width'));
    this.set('height', this.object.attr('height'));
    this.set('fill_color', this.object.attr('fill'));
    this.set('fill_alpha', this.object.attr('opacity'));
    this.set('line_width', this.object.attr('stroke-width'));
    this.set('line_color', this.object.attr('stroke'));

    // push to server
    if (push == 'push') {
      SL.ioController.pushRectUpdate(this);
    }
  },

  save: function() {
    // save to server
    this.update('local');
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
