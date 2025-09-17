// Utility functions
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx'); // Assuming xlsx is installed

class Utils {
  static async waitForSeconds(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  static readJsonFile(filePath) {
    const data = fs.readFileSync(path.resolve(filePath), 'utf8');
    return JSON.parse(data);
  }

  static writeJsonFile(filePath, data) {
    fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2));
  }

  static async writeFile(filePath, data) {
    fs.writeFileSync(path.resolve(filePath), data);
  }

  static async readXlsx() {
    // Implement XLSX reading logic
    // This is a placeholder - adjust based on your XLSX file
    const workbook = XLSX.readFile(path.join(__dirname, '../fixtures/example.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_csv(worksheet);
  }

  static async claimsheet() {
    // Implement claimsheet logic
    // This is a placeholder
    console.log('Claimsheet task executed');
  }

  static async deleteDownloadsFolder() {
    const downloadsPath = path.join(process.cwd(), 'downloads');
    if (fs.existsSync(downloadsPath)) {
      fs.rmSync(downloadsPath, { recursive: true, force: true });
    }
    fs.mkdirSync(downloadsPath);
  }

  static async rmfile() {
    // Implement file removal logic
    // This is a placeholder
    console.log('File removal task executed');
  }

  // Add more utility functions as needed
}

module.exports = Utils;
