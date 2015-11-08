// For the Web services
var express = require('express');
var app = express();
var sleep = require('sleep');
// to remove
// to Use the cam of the raspberry
var path = require('path');
var exec = require('child_process').exec;
// to take a snapshot, start a timelapse or video recording

exec(
		"raspistill --nopreview -w 340 -h 200 -q 10 -o /tmp/stream/pic.jpg -tl 80 -t 0",
		null);

app.use(express.static(path.join(__dirname, 'public')));

require('./server/services.js').services(app);
var server = require('./server/io.js').io(app);
server.listen(8080);
console.log("server loaded");
