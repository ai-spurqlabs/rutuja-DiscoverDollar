// Converted for Playwright - Zips the allure-report directory
const AdmZip = require("adm-zip");

try {
    const zip = new AdmZip();
    zip.addLocalFolder("./allure-report");
    zip.writeZip('./test23.zip');
    console.log('Allure report zipped successfully');
} catch (error) {
    console.error('Error zipping allure report:', error);
}
