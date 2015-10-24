// For the Web services
var express = require('express');
var app = express();
// use to launch the camera and take the images
var sys = require('sys');
var exec = require('child_process').exec;
//to remove
var fs = require('fs');
var say = require('say');
//socket for stream the image
var io = require('socket.io').listen(80);
var ss = require('socket.io-stream');
var path = require('path');


function puts(error, stdout, stderr) {sys.puts(stdout)}
exec("raspistill --nopreview -w 640 -h 480 -q 10 -o ./pic.jpg -tl 125 -t 0", puts);

app.get('/android', function(req, res) {
    var img = fs.readFileSync('./pic.jpg');
    res.setHeader('Content-Type', 'image/gif');
    res.end(img, 'binary');
});

app.get('/testImage', function(req, res) {
	res.sendfile('android.html', {root: __dirname })
});

app.get('/say/:texte', function(req, res) {
	say.speak(null,req.param('texte'));
});

app.listen(8080);