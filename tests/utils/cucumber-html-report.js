// Converted for Playwright - Generates HTML reports from JSON logs
const report = require("multiple-cucumber-html-reporter");

try {
    report.generate({
        jsonDir: "jsonlogs", // ** Path of .json file **//
        reportPath: "./reports/cucumber-htmlreport.html",
        metadata: {
            browser: {
                name: "chrome",
                version: "XX",
            },
            device: "Local test machine",
            platform: {
                name: "Windows",
                version: "11",
            },
        },
    });
    console.log('HTML report generated successfully');
} catch (error) {
    console.error('Error generating HTML report:', error);
}
