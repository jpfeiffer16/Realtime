module.exports = (function () {
	var engine = require('engine.io'),
		server = engine.listen('2999');
		
	server.on('connection', function(socket) {
		socket.send('test');
		socket.on('data', function(data) {
			
		});
		socket.on('close', function() {
			
		});
	});
})();