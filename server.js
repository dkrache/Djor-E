// For the Web services
var express = require('express');
var app = express();
var http = require('http');
// to remove
var fs = require('fs');
var say = require('say');
var path = require('path');
// to Use the cam of the raspberry
var exec = require('child_process').exec;
// to take a snapshot, start a timelapse or video recording

exec(
		"raspistill --nopreview -w 340 -h 200 -q 10 -o ./stream/pic.jpg -tl 80 -t 0",
		null);

app.use(express.static(path.join(__dirname, 'stream')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function(req, res) {
	var img = fs.readFileSync('./stream/pic.jpg');
	res.setHeader('Content-Type', 'image/gif');
	res.end(img, 'binary');
});

app.get('/android.html', function(req, res) {
	res.sendFile('android.html', {
		root : __dirname
	})
});

app.get('/say/:texte', function(req, res) {
	say.speak(null, req.params.texte);
});

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
		fs.readFile('./pic.jpg', function(err, buf) {
			// it's possible to embed binary data
			// within arbitrarily-complex objects
			socket.broadcast.emit('image', {
				image : true,
				buffer : buf.toString('base64')
			});
		});
	});
});

server.listen(8080);

console.log("server loaded");
function sendImage(){
	fs.readFile('./stream/pic.jpg', function(err, buf) {
		// it's possible to embed binary data
		// within arbitrarily-complex objects
		io.sockets.emit('image', {
			image : true,
			buffer : buf.toString('base64')
		});
	});
}
	
setInterval(sendImage,200);