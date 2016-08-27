// http://nodejs.org/api.html#_child_processes
var use_port = 3000;
var restify = require('restify');
var server = restify.createServer();
var web = exports;

var container;

web.start = function(){

	var devices = [];

	server.get('/', function(req, res) {
	  res.json(devices);
	});

	server.get('/device/:serial/wlan0/:wlan0/eth0/:eth0', function(req, res) {
	  if(devices.length <= req.params.serial || req.params.serial < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No quote found');
	  }
	  var i = 0;
	  var device_found = false;
	  for(i = 0;i<=devices.length;i++){
		  if(devices[i] != null){
			  if(devices[i].serial === req.params.serial){
				  device_found = true;
				  break;
			  }
		  }
	  }
	  if(device_found){
		  devices[i].wlan0 = req.params.wlan0;
		  devices[i].eth0 = req.params.eth0;
	  }else{
		  var new_device = {serial : req.params.serial, eth0 : req.params.eth0, wlan0 : req.params.wlan0};
		  devices.push(new_device);
	  }
	  console.log(devices);
	});

	server.listen(use_port);

}
