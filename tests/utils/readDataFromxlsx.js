// Converted for Playwright - Excel and CSV data reading/writing utilities
const XLSX = require('xlsx');
const path = require('path');
const { existsSync, readdirSync, lstatSync } = require('fs');

function readDataFromxlsx(cell_id) {
    try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '');
        const mm = String(today.getMonth() + 1).padStart(2, '');
        const yyyy = today.getFullYear();
        const todayDate = mm + '_' + dd + '_' + yyyy;

        const workbook = XLSX.readFile('./downloads/Claims_All_' + todayDate + '.xlsx');
        const cell_Data = workbook.Sheets["Claims"][cell_id].v;
        return cell_Data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return null;
    }
}

function readDataxlsx(cell_id) {
    try {
        const downloadsDirPath = 'downloads';

        if (!existsSync(downloadsDirPath)) {
            return "Download Directory Not Found";
        }

        const filesOrdered = readdirSync(downloadsDirPath)
            .map(entry => path.join(downloadsDirPath, entry))
            .filter(entryWithPath => lstatSync(entryWithPath).isFile())
            .map(fileName => ({ fileName, mtime: lstatSync(fileName).mtime }))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        if (!filesOrdered.length) {
            return "Folder Not found in Download Directory";
        }

        const workbook = XLSX.readFile(filesOrdered[0].fileName);
        const names = workbook.SheetNames[0];
        const cell_Data = workbook.Sheets[names][cell_id].v;
        return cell_Data;
    } catch (error) {
        console.error('Error reading data from Excel:', error);
        return null;
    }
}

function readDataFromCSV(cell_id) {
    try {
        const downloadsDirPath = 'downloads';

        if (!existsSync(downloadsDirPath)) {
            return "Download Directory Not Found";
        }

        const filesOrdered = readdirSync(downloadsDirPath)
            .map(entry => path.join(downloadsDirPath, entry))
            .filter(entryWithPath => lstatSync(entryWithPath).isFile())
            .map(fileName => ({ fileName, mtime: lstatSync(fileName).mtime }))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        if (!filesOrdered.length) {
            return "Folder Not found in Download Directory";
        }

        const workbook = XLSX.readFile(filesOrdered[0].fileName);
        const names = workbook.SheetNames[0];
        const cell_Data = workbook.Sheets[names][cell_id].v;
        return cell_Data;
    } catch (error) {
        console.error('Error reading data from CSV:', error);
        return null;
    }
}

async function writeDataFromcsv(parameter) {
    try {
        const workbook = XLSX.readFile(parameter.obj1);
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        let i = 2;

        try {
            if (
                worksheet[(parameter.obj3 + i).toString()] ||
                worksheet[(parameter.obj5 + i).toString()] !== undefined
            ) {
                while (
                    worksheet[parameter.obj3 + i.toString()] ||
                    worksheet[parameter.obj5 + i.toString()] !== undefined
                ) {
                    worksheet[parameter.obj3 + i.toString()] = {
                        t: 'n',
                        w: '2',
                        v: parameter.obj2,
                    };
                    XLSX.utils.sheet_add_aoa(worksheet, [[parameter.obj2]], {
                        origin: parameter.obj3 + i.toString(),
                    });

                    worksheet[parameter.obj5 + i.toString()] = {
                        t: 'n',
                        w: '2',
                        v: parameter.obj4,
                    };
                    XLSX.utils.sheet_add_aoa(worksheet, [[parameter.obj4]], {
                        origin: parameter.obj5 + i.toString(),
                    });
                    i++;
                }
            } else {
                worksheet[parameter.obj3 + i.toString()] = {
                    t: 'n',
                    w: '2',
                    v: parameter.obj2,
                };
                XLSX.utils.sheet_add_aoa(worksheet, [[parameter.obj2]], {
                    origin: parameter.obj3 + i.toString(),
                });
                worksheet[parameter.obj5 + i.toString()] = {
                    t: 'n',
                    w: '2',
                    v: parameter.obj4,
                };
                XLSX.utils.sheet_add_aoa(worksheet, [[parameter.obj4]], {
                    origin: parameter.obj5 + i.toString(),
                });
            }
        } catch (error) {
            console.error('Error in writeDataFromcsv loop:', error);
        }

        XLSX.writeFile(workbook, parameter.obj1);
        return parameter.obj1;
    } catch (error) {
        console.error('Error writing data to CSV:', error);
        return null;
    }
}

async function claimNumberCSV(obj) {
    try {
        const workbook = XLSX.readFile(obj.par1);
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];

        worksheet[obj.par2] = {
            v: obj.par3,
        };
        XLSX.utils.sheet_add_aoa(worksheet, [[obj.par3]], {
            origin: obj.par2,
        });
        XLSX.writeFile(workbook, obj.par1);
        return worksheet;
    } catch (error) {
        console.error('Error in claimNumberCSV:', error);
        return null;
    }
}

let cell;
async function readClaimNoFromxlsx(obj) {
    try {
        const workbook = XLSX.readFile(obj.par1);
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        cell = (JSON.stringify(worksheet[obj.par2].v)).replace(/"/g, "");
        return cell;
    } catch (error) {
        console.error('Error reading claim number from Excel:', error);
        return null;
    }
}

const downloadsDirPath = 'downloads';
const getLastDownloadFilePath = () => {
    try {
        if (!existsSync(downloadsDirPath)) {
            return "Download Directory Not Found";
        }

        const filesOrdered = readdirSync(downloadsDirPath)
            .map(entry => path.join(downloadsDirPath, entry))
            .filter(entryWithPath => lstatSync(entryWithPath).isFile())
            .map(fileName => ({ fileName, mtime: lstatSync(fileName).mtime }))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        if (!filesOrdered.length) {
            return "Folder Not found in Download Directory";
        }

        return filesOrdered[0].fileName;
    } catch (error) {
        console.error('Error getting last download file path:', error);
        return null;
    }
};

module.exports = { readDataxlsx, readDataFromCSV, readDataFromxlsx, writeDataFromcsv, claimNumberCSV, readClaimNoFromxlsx, getLastDownloadFilePath };
