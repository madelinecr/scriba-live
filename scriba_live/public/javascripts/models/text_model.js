SL.Text = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  text: "",
  x_pos: 0,
  y_pos: 0,
  object: null,

  element_id: function() {
    return this.object.attr('id');
  }.property('this.object.attr("id")'),

  update: function(push) {
    this.set('x_pos', this.get('object').attr('x'));
    this.set('y_pos', this.get('object').attr('y'));

    if (push == 'local') {
      console.log(this.get('text'));
      this.get('object').val(this.get('text'));
    }
    else
      this.set('text', this.get('object').val());

    // push to server
    if (push == 'push') {
      console.log('update to server');
      SL.ioController.pushTextUpdate(this);
    }
  },

  save: function() {
    console.log("TEXT CREATE");
    // save to server
    SL.ioController.pushTextCreate(this);
  },

  /*remove: function(push) {
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
  }*/

});
