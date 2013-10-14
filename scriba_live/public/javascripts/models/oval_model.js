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

  update: function() {
    this.set('x_pos', this.object.attr('cx'));
    this.set('y_pos', this.object.attr('cy'));
    this.set('width', this.object.attr('rx'));
    this.set('height', this.object.attr('ry'));
  }
});
