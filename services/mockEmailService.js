const { log } = require('../utils/logger');

// Sent Email Notification To The Administrator
exports.sendMockEmail = function sendMockEmail() {
  log.green('Alert email sent to the Admin');
};
