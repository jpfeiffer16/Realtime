module.exports = (function () {
	var Physics = require('../../public/PhysicsJS-0.7.0/dist/physicsjs-full.min.js');
	var Connection = require('./websocket.js');
	
	Connection.start(2999, function(socket) {
		Physics(function(world){
			var viewportBounds = Physics.aabb(0, 0, 200, 200);
			console.log('it appears to be working. (physics.js)');
			world.on('step', function() {
				// world.render();
				// console.log('stepping');
				
				// console.log(world.getBodies());
				//construct the reduced-body array:
				var bodies = world.getBodies(),
					reducedBodies = [];
				
				for (var i = 0; i < bodies.length; i ++) {
					var body = bodies[i];
					var pos = body.state.pos;
					var obj = {
						x: pos._[0],
						y: pos._[1]
					};
					reducedBodies.push(obj);
					console.log(obj);
				}
				
				
				//do send logic:
				// Connection.send(JSON.stringify(world.getBodies()));
				socket.send(reducedBodies);
			});
			
			world.add( Physics.body('circle', {
		        x: 50
		        ,y: 50
		        ,vx: 0.3
		        ,radius: 80
		        ,styles: {
		            fillStyle: '#cb4b16'
		            ,angleIndicator: '#72240d'
		        }
		    }));
			
			world.add([
				Physics.behavior('constant-acceleration'),
				Physics.behavior('body-impulse-response'),
				Physics.behavior('body-collision-detection'),
				Physics.behavior('sweep-prune')
			]);
			// Physics.util.ticker.on(function( time ) {
			// 	console.log('ticking');
		    //     world.step( time );
		    // });
			
			setInterval(function() {
				world.step();
			}, 400);
			
			// world.unpause();
		});
	});
})();