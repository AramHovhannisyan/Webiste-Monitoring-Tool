const { config } = require('./config/config');
const { constructResponseFile, updateResults } = require('./services/resultService');
const { log } = require('./utils/logger');
const { startMonitoring } = require('./controllers/monitoringController');

// Application starting point
async function bootstrap() {
  try {
    /**
     * Create results.json file
     * Track failure count for each endpoint
     */
    await constructResponseFile(config.urls);

    /**
     * Start endpoint's monitorings, with specified interval
     * Save results
     */
    setInterval(async () => {
      const responses = await startMonitoring(config.urls);
      await updateResults(responses);
    }, config.interval);
  } catch (error) {
    log.red('Something went wrong/n');
    console.error(error);
  }
}

// Start the application
bootstrap();
