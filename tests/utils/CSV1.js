// Converted for Playwright - CSV reading and writing utilities
const asyncFunc = async (data) => {
    let zz = [];
    let [output] = await new Promise((resolve, reject) => {
        const Fs = require('fs');
        const CsvReadableStream = require('csv-reader');
        let output = [];
        let inputStream = Fs.createReadStream(data, 'utf8');

        inputStream
            .pipe(new CsvReadableStream({ multiline: true, parseNumbers: true, parseBooleans: true, trim: true, skipHeader: false }))
            .on('data', row => {
                let b = row;
                output.push(b);
            })
            .on('end', () => {
                resolve([output[0]]);
                zz.push(output[0]);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
    return zz;
};

async function chi(parameter) {
    try {
        await asyncFunc(JSON.stringify(parameter.par1).toString().replace(/"/g, '')).then((a) => {
            const Fs = require('fs');
            let b = [];
            b = a;
            b[1][16] = JSON.stringify(parameter.par2).toString().replace(/"/g, '');

            const stringify = require('csv-stringify').stringify;
            stringify(a, { header: true }, function (err, output) {
                if (err) throw err;
                let ds = a[0].toString().replace(`["`, '');
                let a2 = ds.toString().replace(/"/g, '');
                Fs.writeFileSync(JSON.stringify(parameter.par1).toString().replace(/"/g, ''), a2);
            });

            stringify(a, {}, function (err, output) {
                if (err) throw err;
                const newLine = '\r\n';
                let ds = a[1].toString().replace(`["`, '');
                Fs.appendFileSync(JSON.stringify(parameter.par1).toString().replace(/"/g, ''), newLine + ds);
            });
        });
    } catch (error) {
        console.error('Error in chi:', error);
    }
    return null;
}

module.exports = { chi };
