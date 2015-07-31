/* global Physics */
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
  Physics(function(world) {
    
    var renderer = Physics.renderer('pixi', {
      el: 'viewport',
      width: 400,
      height: 400
    });
    
    world.add(renderer);
    
    world.on('step', function() {
      world.render();
      // console.log('rendering');
    });
    
    
    
    
    Physics.util.ticker.on(function( time ) {
        world.step( time );
        // console.log('stepping');
    });
    
    
    
    socket.on('message', function(data){
      // renderSet.clear();
      
      //Render info:
      var parsedData = JSON.parse(data);
      var eventType = parsedData.EventType;
      
      
      if (eventType = 'render') {
      
        var bodies = parsedData.data;
        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          // renderSet.lineStyle(2, 0xFF00FF, 1);
          // renderSet.beginFill(0xFF00BB, 0.25);
          
          // var geoType = body.objType == 'rect' ? 'recttangle'
          if (body.objType == 'rect') {
            //It's a rect
            var exists = checkExists(body.uid);
            if (!exists) {
              //insert the body
              world.add(Physics.body('rectangle', {
                x: body.x,
                y: body.y,
                width: body.width,
                height: body.height,
                treatment: 'static'
              }));
              console.log('adding rect');
            } else {
              //Update the body
              var thisBody = exists[0];
              thisBody.state.pos.x = body.x;
              thisBody.state.pos.y = body.y;  
              thisBody.state.angular.pos = body.angle;
            }
          } else {
            var exists = checkExists(body.uid);
            if (!exists) {
              //insert the body
              world.add(Physics.body('circle', {
                x: body.x,
                y: body.y,
                radius: body.radius,
                treatment: 'static'
              }));
              console.log('adding circle at ' + body.x + ", " + body.y + ", radius:" + body.radius);
            } else {
              //Update the body
              var thisBody = exists[0];
              thisBody.state.pos.x = body.x;
              thisBody.state.pos.y = body.y;  
              thisBody.state.angular.pos = body.angle;
              // console.log('Updating circle ' + body.uid);
              // console.log(thisBody.state.pos.x, thisBody.state.pos.y);
            }
          }
  
        }
      }
      function checkExists(uid) {
        var query = Physics.query({
          uid: uid
        });
        var exists = world.find(query);
        if (exists != false) {
          return exists;
        } else {
          return false;
        }
      }
      
    });
    socket.on('close', function(){
      console.log('closing');
    });
  });
});