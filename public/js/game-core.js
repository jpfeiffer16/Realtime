//Dependent on jquery

window.Game = (function() {
  function hookUpKeyboardEvents() {
    $(document).keypress(function(e) {
      console.log(e.keyCode);
    });
  }
  
  function init() {
    if ($('#viewport').length !== 0) {
      hookUpKeyboardEvents();
      //Do other logic here:
      
      
    } else {
      throw 'No viewport found. Game will not initialize';
    }
  }
  
  
  
  
  
  
  
  return {
    init: init
  };
})();