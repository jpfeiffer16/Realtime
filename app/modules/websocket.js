module.exports = (function () {
	
	var engine, server, webSocket, connected = false, that = this;
	
	var clients = [];
	
	var send = function(data) {
		if (webSocket) {
			webSocket.send(data);
		} else {
			throw 'Server has not been started';
		}
	};
	
	function start(port, callback) {
		if (!engine || !server) {
			engine = require('engine.io');
			server = engine.listen(port);
			
			server.on('connection', function(socket) {
				// socket.send('connected');
				// that.send = socket.send;
				// connected = true;
				// webSocket = socket;
				// socket.on('data', function(data) {
				// 	if (typeof(that.onData) == 'function') {
				// 		that.onData(data);
				// 	}
				// });
				// socket.on('close', function() {
				// 	if (typeof(that.onClose) == 'function') {
				// 		that.onClose();
				// 	}
				// });
				clients.push(socket);
				if (clients.length == 1	) {
					callback(socket);
				}
			});
		}
	};
	
	function stop() {
		server.close();
	}
	
	
	var onData = null;
	
	var onClose = null;
	
	// this.send = function(data) {
	// 	if (connected) {
	// 		// webSockett.send(data);
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };
	
	
	var sendToAllClients = function(data) {
		for (var i = 0; i < clients.length; i++) {
			var client = clients[i];
			client.send(data);
		}
	};
	
	return {
		onData: onData,
		onClose: onClose,
		send: send,
		start: start,
		stop: stop,
		sendToAllClients: sendToAllClients
	};
	
})();

