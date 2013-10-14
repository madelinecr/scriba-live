SL.Text = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  x_pos: 0,
  y_pos: 0,
  text: '',
  object: null,

  update: function() {
    this.set('x_pos', this.object.attr('x'));
    this.set('y_pos', this.object.attr('y'));
    this.set('text', this.object.attr('text'));
  }
});
