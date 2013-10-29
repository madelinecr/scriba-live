SL.Path = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  x_pos: 0,
  y_pos: 0,
  path: function(){
    return this.get('object').node.attributes.d.value;
  }.property('this.object.node.attributes.d.value'),

  object: null,

  element_id: function() {
    return this.get('object').node.id;
  }.property('this.object.node.id'),

  update: function(push) {
    this.set('path', this.object.node.attributes.d.value);
    // push to server
    if (push == 'push') {
      SL.ioController.pushPathUpdate(this);
    }
    console.log('path.update')
  },

  save: function() {
    //save to server
    SL.ioController.pushPathCreate(this);
  },

  remove: function(push) {
    // delete raphael object
    var rg_obj = this.get('object');
    this.set('object', null);
    rg_obj.remove();

    // remove from server
    if (push == 'push') {
      SL.ioController.pushPathDestroy(this);
    }

    // remove this object
    this.destroy();
  }

});