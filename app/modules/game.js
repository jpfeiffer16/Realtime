module.exports = (function () {
	var Physics = require('../../public/PhysicsJS-0.7.0/dist/physicsjs-full.min.js');
	var Connection = require('./websocket.js');
	
	Connection.start(2999, function(socket) {
		Physics(function(world){
			var viewportBounds = Physics.aabb(0, 0, 400, 400);
			console.log('it appears to be working. (physics.js)');
			world.on('step', function() {
				// world.render();
				// console.log('stepping');
				
				// console.log(world.getBodies());
				//construct the reduced-body array:
				
			});
			
			// world.add( Physics.body('circle', {
		    //     x: 0
		    //     ,y: 0
		    //     ,vx: 4
		    //     ,radius: 3
			// 	,mass: 1
			// 	,restitution: .5
		    //     ,styles: {
		    //         fillStyle: '#cb4b16'
		    //         ,angleIndicator: '#72240d'
		    //     }
		    // }));
		    //     x: 0
		    //     ,y: 0
		    //     ,vx: 4
		    //     ,radius: 3
			// 	,mass: 1
			// 	,restitution: .5
		    //     ,styles: {
		    //         fillStyle: '#cb4b16'
		    //         ,angleIndicator: '#72240d'
		    //     }
		    // }));
			// world.add( Physics.body('rectangle', {
		    //     x: 60
		    //     ,y: 0
		    //     ,vx: 0.3
		    //     ,width: 10
			// 	,height: 50
			// 	,mass: 1
			// 	,restitution: .5
		    //     ,styles: {
		    //         fillStyle: '#cb4b16'
		    //     }
		    // }));
			
			for (var i = 0; i < 200; i = i + 10) {
				for (var j = 0; j < 200; j = j + 10) {
					world.add( Physics.body('circle', {
				        x: j
				        ,y: i
				        ,vx: 1
				        ,radius: 3
						,mass: 1
						,restitution: .5
				        ,styles: {
				            fillStyle: '#cb4b16'
				            ,angleIndicator: '#72240d'
				        }
				    }));
				}
			}
			
			var edgeBounce = Physics.behavior('edge-collision-detection', {
	            aabb: viewportBounds
	            ,restitution: .5
	            ,cof: 0.8
	        });
	
	        world.add( edgeBounce );
			
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
			}, 10);
			setInterval(function() {
				var bodies = world.getBodies(),
					reducedBodies = [];
				
				for (var i = 0; i < bodies.length; i ++) {
					var body = bodies[i];
					var pos = body.state.pos;
					if (body.radius != undefined) {
						//It's a circle
						var obj = {
							objType: 'circle',
							radius: body.radius,
							x: pos._[0],
							y: pos._[1]
						};
					} else {
						//Render it as a rect
						var obj = {
							objType: 'rect',
							width: body.width,
							height: body.height,
							x: pos._[0],
							y: pos._[1]
						};
					}
					
					reducedBodies.push(obj);
				}
				
				
				//do send logic:
				socket.send(JSON.stringify(reducedBodies));
			}, 100);
			
			// world.unpause();
		});
	});
})();