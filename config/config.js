const path = require('path');
const { log, showValidationError } = require('../utils/logger');
const { fileExists, stopProcess } = require('../utils/utils');
const { validateConfigFile } = require('../validators/validateConfigFile');

// Check if required congig file exists
const filePath = path.join(__dirname, '../config.json');
if (!fileExists(filePath)) {
  log.red('Configuration file is missing \nSetup config.json in root directory');
  stopProcess(0);
}

// Validate config file
const configObj = require(filePath);
const { error } = validateConfigFile(configObj);

// Show validation error and exit the process.
if (error) {
  showValidationError(error.details);
  stopProcess(0);
}

// Preapre application config object
const config = {
  urls: configObj.urls,
  interval: configObj.interval ?? 3000,
  threshold: configObj.threshold ?? 5,
};

exports.config = config;
