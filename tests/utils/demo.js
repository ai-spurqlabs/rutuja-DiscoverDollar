// Converted for Playwright - Reads CSV files from downloads directory
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');

let vv = [];

const read = () => {
    let arr = [];
    const dirPath = path.join(__dirname, '../downloads/');
    const path2 = dirPath.replace(/\\/g, "/");
    console.log(path2);

    const workbook = new Excel.Workbook();

    try {
        const files = fs.readdirSync(path2);

        for (const file of files) {
            if (path.extname(file) === ".csv") {
                console.log(file);

                const glob = require('glob');
                const newestFile = glob.sync(dirPath + '*.csv')
                    .map(name => ({ name, ctime: fs.statSync(name).ctime }))
                    .sort((a, b) => b.ctime - a.ctime)[0].name;

                workbook.csv.readFile(newestFile).then(() => {
                    for (let index = 2; workbook.worksheets[0].getCell('Z' + index).value !== undefined && workbook.worksheets[0].getCell('Z' + index).value !== ''; index++) {
                        arr.push(workbook.worksheets[0].getCell('Z' + index).value);
                    }
                }).finally(() => {
                    console.log(arr);
                    vv = arr;
                });
            }
        }
    } catch (error) {
        console.error('Error reading files:', error);
    }

    return vv;
};

module.exports = {
    read
};
