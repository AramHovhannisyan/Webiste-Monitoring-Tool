const fs = require('fs');
const path = require('path');

const { sendMockEmail } = require('./mockEmailService');
const { log, alertSiteStatus } = require('../utils/logger');
const ResponseItemDto = require('../dto/ResponseItemDto');
const { threSholdCrossed } = require('../utils/configUtils');
const {
  statusIsOK,
  alertWasSent,
  updateFailureCount,
  saveIsAlerted,
  resetAlertAndThreshold,
  dataHasChanged,
} = require('../utils/utils');

/**
 * Create object for each endpoint
 * Object keys: url, threshold, alerted
 */
exports.constructResponseFile = async function (urls) {
  const resultsArr = urls.map(singleUrl => new ResponseItemDto(singleUrl));

  await setResults(resultsArr);
};

/**
 * Update results for each endpoint if needed
 * newInfoTracked is used to check if the results file needs any change
 */
exports.updateResults = async function (responses) {
  let newInfoTracked = false;

  const resultsArr = await getResults();

  // Iterate through each response
  for (let responsesIndex = 0; responsesIndex < responses.length; responsesIndex++) {
    const { url: singleResponseUrl, status: singleResponseStatus } = responses[responsesIndex];

    const foundResult = resultsArr.find(singleResult => singleResult.url === singleResponseUrl);

    // If site is down, Update failure count, and alert if threShold Crossed
    if (!statusIsOK(singleResponseStatus)) {
      newInfoTracked = true;

      const failureCount = foundResult.threshold + 1;
      updateFailureCount(foundResult);

      if (threSholdCrossed(failureCount) && !alertWasSent(foundResult)) {
        alertSiteStatus(foundResult.url, failureCount);
        saveIsAlerted(foundResult);
        sendMockEmail();
      }
    } else {
      // Reset failure count and alert data, if site is responding again.
      if (dataHasChanged(foundResult)) {
        newInfoTracked = true;
        resetAlertAndThreshold(foundResult);
      }
    }
  }

  // Update file ONLY IF NEW DATA TRACKED
  if (newInfoTracked) {
    console.log('Updating Content...');
    await setResults(resultsArr);
  }
};

// Get result objects from JSON FILE
async function getResults() {
  const resultsFilePath = path.join(__dirname, '../', 'results', 'results.json');
  const resultsData = fs.readFileSync(resultsFilePath);

  return JSON.parse(resultsData);
}

// Save result objects into JSON FILE
async function setResults(results) {
  const resultsJSON = JSON.stringify(results);

  const resultsFilePath = path.join(__dirname, '../', 'results', 'results.json');

  fs.writeFile(resultsFilePath, resultsJSON, err => {
    if (err) {
      log.red('Results can not be save');
    }
    // else {
    //   log.white('\nResults Saved\n', '\x1b[37m');
    // }
  });
}
