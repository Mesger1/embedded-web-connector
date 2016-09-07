// http://nodejs.org/api.html#_child_processes
var use_port = 80;
var restify = require('restify');
var server = restify.createServer();
var web = exports;

var container;

web.start = function(){

	var devices = [];


	
	server.get('/devicestatus/:serial', function(req, res) {
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
	  console.log(devices[i]);
	  res.json(devices[i]);
	});

	server.get('/device/:serial/gatewaywlan0/:gatewaywlan0/gatewayeth0/:gatewayeth0/type/:type/ipwlan0/:ipwlan0/ipeth0/:ipeth0', function(req, res) {
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
		  devices[i].gatewaywlan0 = req.params.gatewaywlan0;
		  devices[i].gatewayeth0 = req.params.gatewayeth0;
		  devices[i].ipeth0 = req.params.ipeth0;
		  devices[i].ipwlan0 = req.params.ipwlan0;
		  
		  devices[i].type = req.params.type;
	  }else{
		  var new_device = {
				serial : req.params.serial,
				gatewayeth0 : req.params.gatewayeth0, 
				gatewaywlan0 : req.params.gatewaywlan0, 
				type : req.params.type,
				ipwlan0 : req.params.ipwlan0,
				ipeth0 : req.params.ipeth0
				};
		  devices.push(new_device);
	  }
	  console.log(devices);
	});

		server.get(/.*/, restify.serveStatic({
		'directory': 'public',
		'default': 'index.html'
	}));
	server.listen(use_port);

}
