import { removeYarnFilesOnServer } from './storageUtils';
const cron = require('node-schedule');

//Run in every 10 hrs
//cron.scheduleJob('0 0 */10 * * *', () => removeYarnFilesOnServer());
