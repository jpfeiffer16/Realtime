/* global fabric */
/* global eio */
var socket = eio('ws://localhost:2999');

// var view = new fabric.StaticCanvas('viewport');

socket.on('open', function(){
  console.log('Opening');
  socket.on('message', function(data){
    // console.log(data);
    
    //Render info:
    var one = new fabric.Rect({
        width: 10, height: 10,
        left: 0, top: 0,
        fill: 'yellow'
        // angle: 30
    });
    
    view.add(one);
  
    var bodies = data;
    
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      one.top = body.y;
      one.left = body.x;
      // view.renderAll();
    }
    
    
    
  });
  socket.on('close', function(){
    console.log('closing');
  });
});