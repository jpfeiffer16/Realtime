

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

//Start the web socket
// require('./app/modules/websocket.js');

//Start the game engine
//require('./app/modules/game.js');

// mongoose.connect(config.db);
// var db = mongoose.connection;
// db.on('error', function () {
//   throw new Error('unable to connect to database at ' + config.db);
// });

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

var io = require('engine.io')(app);

require('./config/express')(app, config);

app.listen(config.port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

