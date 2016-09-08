// http://nodejs.org/api.html#_child_processes
var use_port = 80;
var restify = require('restify');
var server = restify.createServer();
var web = exports;

var container;

web.start = function(){


	// Add headers
	server.use(function (req, res, next) {

		// Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});

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
	});

	server.get(/.*/, restify.serveStatic({
		'directory': '/home/ubuntu/embedded-web-connector/public',
		'default': 'index.html'
	}));
	server.listen(use_port);

}
