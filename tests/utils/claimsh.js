// Converted for Playwright - Handles file operations, zipping, and moving
const AdmZip = require("adm-zip");
const path = require('path');
const fs = require('fs');
const fs1 = require('fs-extra');

const read1 = () => {
    const zip = new AdmZip();
    const dirPath = path.join(__dirname, '../filename1/');
    const path2 = dirPath.replace(/\\/g, "/");
    let q;

    try {
        q = JSON.stringify(fs.readFileSync(path.join(__dirname, '../fixtures/abc.txt'), { encoding: "utf8" }));
        let x = [];
        x = q.split(",");
        let d = JSON.stringify(x[0]).replace(`['"`, '').replace(/"\\"/, '').replace(/"/, '');
        console.log(d);

        const files = fs.readdirSync(path2);
        for (const file of files) {
            console.log(file);
            fs.renameSync(path2 + file, path2 + d + ".xlsx");
        }

        const zip2 = new AdmZip();
        zip2.addLocalFile("./filename1/" + d + ".xlsx");
        zip2.writeZip('./test22.zip');

        fs1.move('../test22.zip', '../fixtures/test22.zip', function (err) {
            if (err) return console.error(err);
            console.log("success!");
        });

        console.log('The file has been moved');
    } catch (error) {
        console.error('Error in read1:', error);
    }

    return null;
};

module.exports = {
    read1
};
