
exports.io = function(app){
	var http = require('http');
	var fs = require('fs');
	var ss = require('socket.io-stream');
	var server = http.createServer(app);
	var io = require('socket.io').listen(server);

	// Quand on client se connecte, on le note dans la console

	io.sockets.on('connection', function(socket) {
		console.log('a user connected: ' + socket.id);
		socket.on('disconnect', function() {
			console.log(socket.name + ' has disconnected from the chat.'
					+ socket.id);
		});
		socket.on('join', function(name) {
			socket.name = name;
			console.log(socket.name + ' joined the chat.');
		});
		socket.on('ask', function() {
			fs.readFile('/tmp/stream/pic.jpg', function(err, buf) {
				// it's possible to embed binary data
				// within arbitrarily-complex objects
				socket.broadcast.emit('image', {
					image : true,
					buffer : buf.toString('base64')
				});
			});
		});
	});
	
	function sendImage() {
		fs.readFile('/tmp/stream/pic.jpg', function(err, buf) {
			// it's possible to embed binary data
			// within arbitrarily-complex objects
			io.sockets.emit('image', {
				image : true,
				//buffer : buf.toString('base64')
			});
		});
	}
	setInterval(sendImage, 200);
	return server;
}