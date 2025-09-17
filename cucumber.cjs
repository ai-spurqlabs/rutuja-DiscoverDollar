module.exports = {
  default: {
    import: ['tests/step_definitions/**/*.js', 'tests/utils/hooks.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['tests/features/**/*.feature'],
    dryRun: false,
    failFast: false,
    strict: true,
    defaultTimeout: 60000,
  },
};
