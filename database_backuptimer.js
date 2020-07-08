const CronJob = require('cron').CronJob;
var Cron = require('./database_backupscript');
new CronJob('0 19 * * *',  function() {
Cron.dbAutoBackUp();
}, null, true, 'America/New_York');