window.onload = function() {
  // Add all events you want to fire when page is finished loading

 // SL.editorController.startDemo();

  var element = $('#current_page');

  if(element.html()=='PROFILE'){
    SL.profileController.initProfile();
  }
  
}
