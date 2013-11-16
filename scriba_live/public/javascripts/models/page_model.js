SL.Page = Em.Object.extend({
  id: 0,
  note_id: 0,
  user_id: 0,
  width: 0,
  height: 0,
  page_index: 0,
  jq_id: "",
  object: null,

  save: function() {
    // save to server
    SL.ioController.pushPageCreate(this);
  }/*,

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
  }*/
});
