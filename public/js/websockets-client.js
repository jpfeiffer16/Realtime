/* global fabric */
/* global eio */
var socket = eio('ws://localhost:2999');

// var view = new fabric.StaticCanvas('viewport');

var stage, renderer, test;

window.onload = function(e) {
  stage = new PIXI.Stage(0x66FF99);
  
  renderer = PIXI.autoDetectRenderer(400, 400);
    
  document.body.appendChild(renderer.view);
  
  test = new PIXI.Rectangle(0, 0, 20, 20);
  
  stage.addChild(test);
  
  requestAnimFrame( animate );
}

function animate() {
 
    requestAnimFrame( animate );

    // // just for fun, lets rotate mr rabbit a little
    // bunny.rotation += 0.1;

    // render the stage   
    renderer.render(stage);
}
socket.on('open', function(){
  console.log('Opening');
  socket.on('message', function(data){
    // console.log(data);
    
    //Render info:
    var bodies = data;
    var body = bodies[0];
    
    
    // console.dir(test);
    if (test) {
      test.x = body.x;
      test.y = body.y;
    }
    
  });
  socket.on('close', function(){
    console.log('closing');
  });
});