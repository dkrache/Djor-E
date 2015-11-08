exports.services = function(app){
	var say = require('say');
	var gpio = require("pi-gpio");
	
	app.get('/test', function(req, res) {
		var img = fs.readFileSync('/tmp/stream/pic.jpg');
		res.setHeader('Content-Type', 'image/gif');
		res.end(img, 'binary');
	});
	
	app.get('/android', function(req, res) {
		res.sendFile('../view/android.html', {
			root : __dirname
		})
	});
	
	app.get('/say/:texte', function(req, res) {
		console.log(req.params.texte);
		say.speak(null, req.params.texte);
		res.writeHead(200, {
			'content/type' : 'application/json'
		});
	});
	app.get('/run/:pin', function(req, res) {
		gpio.open(req.params.pin, "output", function(err) {
			gpio.write(req.params.pin, 1, function() {
				sleep.sleep(2);
				gpio.close(req.params.pin);
			});
		});
	});
	
}