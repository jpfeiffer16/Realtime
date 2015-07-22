module.exports = (function () {
	var Physics = require('../../public/PhysicsJS-0.7.0/dist/physicsjs-full.min.js');

	Physics(function(world){
		console.log('it appears to be working. (physics.js)');
	});
})();