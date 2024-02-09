const { getCurrentDate } = require('../utils/utils');

const resetColor = '\x1b[0m';

// Simple console.info-s with ISO date and color
const log = {
  white: text => console.info('\x1b[37m' + new Date().toISOString() + '    ' + text + resetColor),
  red: text => console.info('\x1b[31m' + new Date().toISOString() + '    ' + text + resetColor),
  blue: text => console.info('\x1b[34m' + new Date().toISOString() + '    ' + text + resetColor),
  yellow: text => console.info('\x1b[33m' + new Date().toISOString() + '    ' + text + resetColor),
  green: text => console.info('\x1b[32m' + new Date().toISOString() + '    ' + text + resetColor),
  space: () => console.info('\x1b[32m' + ' ' + resetColor),
};

function displaySiteStatus(response, url) {
  if (response.status === 'fulfilled') {
    log.blue(`${url} is UP, status code: ${response.value.status}`);
  } else {
    log.yellow(`${url} is DOWN, error: ${response.reason.message}`);
  }
}

function alertSiteStatus(url, failCount) {
  log.space();
  log.red(`Website down alert: ${url}`, `Failed ${failCount} times`);
  log.space();
}

// Display JOI erros
function showValidationError(errorDetails) {
  for (let errorIndex = 0; errorIndex < errorDetails.length; errorIndex++) {
    const singleError = errorDetails[errorIndex];

    log.red(singleError.message);
  }
}

// Display info right after monitoring is started
function displayStartingInfo() {
  const startDate = getCurrentDate();

  log.space();
  log.white(`Monitoring started at: ${startDate}\n`);
}

exports.log = log;
exports.displaySiteStatus = displaySiteStatus;
exports.alertSiteStatus = alertSiteStatus;
exports.showValidationError = showValidationError;
exports.displayStartingInfo = displayStartingInfo;
