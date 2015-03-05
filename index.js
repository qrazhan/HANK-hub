var noble = require('noble');

noble.startScanning();

var button = null;

var serviceUUIDs = ['2220'];
var charUUIDs = ['2221','2222'];

onConnect = function(){
	console.log('connected!');
	button.discoverSomeServicesAndCharacteristics(serviceUUIDs, charUUIDs, onServiceDiscovery);
}

onServiceDiscovery = function(error, services, chars){
	if(error){
		console.log('error discovering services');
	} else {
		console.log(chars);
		notifyChar = chars[0];
		notifyChar.on('read', function(data, isNotif){
			if(isNotif){
				console.log('data from button: ', data);
			}	
		});
		notifyChar.notify(true, function(err){
			if(err){
				console.log('error enabling notifications', err);
			} else {
				console.log('enabled notifications');
			}	
		});
	}
}

noble.on('discover', function(peripheral){
	var name = peripheral.advertisement.localName;
	console.log(name);
	peripheral.on('connect', onConnect);
	if(name === 'BrewmasterHank'){
		button = peripheral;
		peripheral.connect(function(error){
			if(error){
				console.log('error connecting');
			}
		});
	}	
});