// Converted for Playwright - Deletes specific files
const fs = require('fs');

const deleteFile = '../test22.zip';
const deletefile2 = '../fixtures/test22.zip';

const del = () => {
    try {
        fs.unlink(deleteFile, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('deleted');
            }
        });

        fs.unlink(deletefile2, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('deleted');
            }
        });
    } catch (error) {
        console.error('Error deleting files:', error);
    }

    return null;
};

module.exports = {
    del
};
