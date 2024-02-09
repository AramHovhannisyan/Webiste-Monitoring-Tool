const fs = require('fs');
const axios = require('axios');

// Check if statusCode starts with 2
function statusIsOK(code) {
  return String(code).charAt(0) === '2';
}

function fileExists(path) {
  return fs.existsSync(path);
}

function stopProcess(code) {
  process.exit(code);
}

// Promisify axios request to be used in axios.all or axios.allSetled
function getPromiseRequests(urls) {
  return urls.map(endpoint => axios.get(endpoint));
}

// Current date and time
function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

// Check if alert was sent, so the action will not be repeated until website is up, and threshold reached again
function alertWasSent(resultObj) {
  return resultObj.alerted;
}

// Save when alert was sent
function saveIsAlerted(foundResult) {
  foundResult.alerted = true;
}

// Reset failure date when site is working again
function resetAlertAndThreshold(foundResult) {
  foundResult.threshold = 0;
  foundResult.alerted = false;
}

// Increment failure count
function updateFailureCount(foundResult) {
  foundResult.threshold += 1;
}

// Check if there is info to reset, when website is up again
function dataHasChanged(foundResult) {
  return foundResult.threshold > 0 || foundResult.alerted === true;
}

exports.statusIsOK = statusIsOK;
exports.fileExists = fileExists;
exports.getCurrentDate = getCurrentDate;
exports.alertWasSent = alertWasSent;
exports.updateFailureCount = updateFailureCount;
exports.saveIsAlerted = saveIsAlerted;
exports.resetAlertAndThreshold = resetAlertAndThreshold;
exports.dataHasChanged = dataHasChanged;
exports.stopProcess = stopProcess;
exports.getPromiseRequests = getPromiseRequests;
