SL.Path = Em.Object.extend({
  id: 0,
  page_id: 0,
  note_id: 0,
  user_id: 0,
  path: function(){
    return this.get('object').node.attributes.d.value;
  }.property('this.object.node.attributes.d.value'),

  object: null,

  element_id: function() {
    return this.get('object').node.id;
  }.property('this.object.node.id'),

  update: function() {
    this.set('path', this.object.node.attributes.d);
  },

  save: function () {
    //save to server here
    SL.ioController.pushPathCreate(this);
  },

  remove: function() {
    // delete raphael object
    var raph_object = this.get('object');
    this.set('object', null);
    raph_object.remove();

    // remove from server
    SL.ioController.pushPathDestroy(this);

    // remove this object
    this.destroy();
  }

});