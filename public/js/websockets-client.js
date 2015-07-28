/* global PIXI */
/* global fabric */
/* global eio */
var socket = eio('ws://localhost:2999');

// 
// var stage = new PIXI.Container(); 
//  
// // create a renderer instance.
// var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor : 0x1099bb});
// 
// // add the renderer view element to the DOM
// document.body.appendChild(renderer.view);
// 
// requestAnimationFrame( animate );
// 
// 
// function animate() {
// 
//     requestAnimationFrame( animate );
//     // render the stage   
//     renderer.render(stage);
// }
// 







// var renderSet = new PIXI.Graphics();
// stage.addChild(renderSet);


socket.on('open', function(){
  console.log('Opening');
  socket.on('message', function(data){
    renderSet.clear();
    
    //Render info:
    var bodies = JSON.parse(data);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      // renderSet.lineStyle(2, 0xFF00FF, 1);
      // renderSet.beginFill(0xFF00BB, 0.25);
      if (body.objType == 'rect') {
        // renderSet.drawRect((body.x) - (body.x / 2), (body.y) - (body.y / 2), body.width, body.height);
      } else {
        // renderSet.drawCircle(body.x, body.y, body.radius);
      }
      // renderSet.endFill();
    }
    
  });
  socket.on('close', function(){
    console.log('closing');
  });
});