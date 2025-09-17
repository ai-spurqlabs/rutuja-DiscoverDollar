// Converted for Playwright - Unzips files to downloads directory
const AdmZip = require("adm-zip");
let excelName;

async function unzip(fileName) {
    try {
        const zip = new AdmZip(fileName);
        const zipEntries = zip.getEntries();

        zipEntries.forEach(function (zipEntry) {
            excelName = (JSON.stringify(zipEntry.name)).replace(/"/g, "");
        });

        zip.extractAllTo("./downloads", true);
        console.log('File unzipped successfully');
        return excelName;
    } catch (error) {
        console.error('Error unzipping file:', error);
        return null;
    }
}

module.exports = { unzip };
