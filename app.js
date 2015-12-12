var app = require('express')(),
  server = require('http').Server(app),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var io = require('socket.io')(server);

require('./config/express')(app, config);

server.listen(config.port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

