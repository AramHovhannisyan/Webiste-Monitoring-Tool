# About project

This application monitors websites whose URLs are specified in the `config.json` configuration file.

1. It displays the time and status for each URL.
2. Successful requests are shown in blue.
3. UnSuccessful requests are shown in yellow.
4. After a few failures, a warning message is displayed in red and a mock email is sent.

The file /results/results.json is used to save the results.

# Instructions

To setup the project, run `npm install`

To start the app run `npm start` or `node monitor.js`.

To update urls use `urls` in `config.json` file.
To update alert threshold use `threshold` in `config.json` file.
To update monitoring interval use `interval` in `config.json` file.

