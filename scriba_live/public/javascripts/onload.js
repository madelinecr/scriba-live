window.onload = function() {
  // Add all events you want to fire when page is finished loading

  // $('#current_page').getvaluesomehow
 // SL.editorController.startDemo();

  var element = $('#current_page');

  if(element.html()=='PROFILE'){
    SL.profileController.initProfile();
  }
  else if(element.html()=='WELCOME'){

    //SL.welcomeController.initWelcome();
  }
  else if (element.html()=='EDITOR') {
    SL.ioController.createConnection();
  }

}
