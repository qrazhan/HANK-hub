var noble = require('noble');

var serviceUUIDs = ['2220'];
var charUUIDs = ['2221','2222'];


noble.startScanning();

function charToName(char){
	return char._noble._peripherals[char._peripheralUuid].advertisement.localName;
}

onServiceDiscovery = function(error, services, chars){
	if(error){
		console.log('error discovering services');
	} else {
		console.log('discovered services');
		buttonName = charToName(chars[0]);
		notifyChar = chars[0];
		notifyChar.on('read', function(data, isNotif){
			if(isNotif){
				console.log('data from ', buttonName, ': ', data);
			}	
		});
		notifyChar.notify(true, function(err){
			if(err){
				console.log('error enabling notifications', err);
			} else {
				console.log('enabled notifications to ',buttonName);
			}	
		});
	}
}

var connectDevice = function(peripheral, name) {
	peripheral.connect(function(error){
		if(error){
			console.log('error connecting to ',name, error);
			//connectDevice(peripheral, name);
		} else {
			//peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, charUUIDs, onServiceDiscovery);
		}
		console.log('discoveringgggg');
		peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, charUUIDs, onServiceDiscovery);
	});
}

noble.on('discover', function(peripheral){
	var name = peripheral.advertisement.localName;
	console.log(name);
	if(name === 'BrewmasterYell' || name === 'BrewmasterMage'){
	//if(name === 'BrewmasterHank'){
		connectDevice(peripheral, name);
		var now = new Date();
		while(new Date().getTime() < now+1000){
			// do nothing, l0l
		}	
	}
});