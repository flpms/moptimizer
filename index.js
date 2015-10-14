var watcher = require('./lib/watcher.js');
var loadConfig = require('./lib/load-config.js');


loadConfig('./config.json', function(data) {

	console.log('Watcher Run and Load Config');

	watcher.init(data);

	console.log('Watcher Run, Load Config and Initiliazed');
});

console.log('Watcher Run');