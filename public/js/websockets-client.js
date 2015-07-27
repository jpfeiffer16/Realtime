/* global PIXI */
/* global fabric */
/* global eio */
var socket = eio('ws://localhost:2999');


var stage = new PIXI.Container(); 
 
// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor : 0x1099bb});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimationFrame( animate );
// 
// // create a texture from an image path
// var texture = PIXI.Texture.fromImage("http://www.goodboydigital.com/pixijs/examples/1/bunny.png");
// // create a new Sprite using the texture
// var bunny = new PIXI.Sprite(texture);
// 
// var graphics = new PIXI.Graphics();
// graphics.lineStyle(2, 0xFF00FF, 1);
// graphics.beginFill(0xFF00BB, 0.25);
// graphics.drawRoundedRect(20, 20, 20, 20, 3);
// graphics.endFill();
// 
// stage.addChild(graphics);
// 
// // center the sprites anchor point
// bunny.anchor.x = 0.5;
// bunny.anchor.y = 0.5;
// 
// // move the sprite t the center of the screen
// bunny.position.x = 200;
// bunny.position.y = 150;
// 
// stage.addChild(bunny);

function animate() {

    requestAnimationFrame( animate );

    // just for fun, lets rotate mr rabbit a little
    // bunny.rotation += 0.1;

    // render the stage   
    renderer.render(stage);
}






var renderSet = new PIXI.Graphics();
stage.addChild(renderSet);


socket.on('open', function(){
  console.log('Opening');
  socket.on('message', function(data){
    renderSet.clear();
    
    //Render info:
    var bodies = JSON.parse(data);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      renderSet.lineStyle(2, 0xFF00FF, 1);
      renderSet.beginFill(0xFF00BB, 0.25);
      if (body.objType == 'rect') {
        renderSet.drawRect((body.x) - (body.x / 2), (body.y) - (body.y / 2), body.width, body.height);
      } else {
        renderSet.drawCircle(body.x, body.y, body.radius);
      }
      renderSet.endFill();
    }
    
  });
  socket.on('close', function(){
    console.log('closing');
  });
});