module.exports = (function () {
	var Physics = require('../../public/PhysicsJS-0.7.0/dist/physicsjs-full.min.js');

	Physics(function(world){
		console.log('it appears to be working. (physics.js)');
		world.on('step', function() {
			world.render();
			console.log('stepping');
		});
		
		world.add( Physics.body('circle', {
	        // x: renderer.width * 0.4
	        // ,y: renderer.height * 0.3
	        vx: 0.3
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
		Physics.util.ticker.on(function( time ) {
			console.log('ticking');
	        world.step( time );
	    });
	});
})();