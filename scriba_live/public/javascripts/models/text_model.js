SL.Text = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  x_pos: 0,
  y_pos: 0,
  text: '',
  object: null,

  element_id: function() {
    return this.object.attr('id');
  }.property('this.object.attr("id")'),

  update: function() {
    this.set('x_pos', this.object.attr('x'));
    this.set('y_pos', this.object.attr('y'));
    this.set('text', this.object.val());

     // push to server
    if (push == 'push') {
      SL.ioController.pushTextUpdate(this);
    }
  },

  save: function() {
    // save to server
    SL.ioController.pushTextCreate(this);
  },

  remove: function(push) {
    // delete raphael object
    var rg_obj = this.get('object');
    this.set('object', null);
    rg_obj.remove();

    // remove from server
    if (push == 'push') {
      SL.ioController.pushTextDestroy(this);
    }

    // remove this object
    this.destroy();
  }

});
