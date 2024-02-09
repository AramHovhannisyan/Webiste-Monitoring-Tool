const { config } = require('../config/config');

function threSholdCrossed(failureCount) {
  return failureCount >= config.threshold;
}

exports.threSholdCrossed = threSholdCrossed;
