var img = document.getElementById('image');
var socket = io.connect('http://192.168.0.17:8080');
(function() {
	socket.on('connect', function() {
		socket.emit('join', 'Djory');
		socket.on('image', function(info) {
			if (info.image) {
				img.src = 'data:image/jpeg;base64,' + info.buffer;
			}
		});
	})
})();
