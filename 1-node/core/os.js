var os = require('os');
console.log('Host name', os.hostname());

console.log('This machine has', os.cpus().length, 'CPUs');
console.log('cpu details', os.cpus());

var gigaByte = 1 / (1024 ^ 3);
console.log('Total Memory', os.totalmem() * gigaByte, 'GBs');
console.log('Available Memory', os.freemem() * gigaByte, 'GBs');
console.log('Percent consumed', 100 * (1 - os.freemem() / os.totalmem()));
