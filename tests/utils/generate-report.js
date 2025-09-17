const report = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber-report.json',
  output: 'cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome',
    'Platform': 'Windows',
    'Parallel': 'Scenarios',
    'Executed': 'Remote',
  },
};

report.generate(options);
