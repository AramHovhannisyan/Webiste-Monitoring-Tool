const { getPromiseRequests } = require('../utils/utils');
const { displaySiteStatus, displayStartingInfo } = require('../utils/logger');
const ResponseDto = require('../dto/ResponseDto');

async function startMonitoring(urls) {
  displayStartingInfo();

  const promiseRequests = getPromiseRequests(urls);
  const responses = await Promise.allSettled(promiseRequests);
  return handleRequests(responses, urls);
}

function handleRequests(responses, urls) {
  /**
   * Display statuses
   * Build and return url, statusCode for each response
   */
  return responses.map((singleResponse, index) => {
    displaySiteStatus(singleResponse, urls[index]);

    const statusCode =
      singleResponse.status === 'fulfilled'
        ? singleResponse.value.status
        : singleResponse.reason.message;

    return new ResponseDto(urls[index], statusCode);
  });
}

exports.startMonitoring = startMonitoring;
