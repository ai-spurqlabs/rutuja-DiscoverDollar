import {
    When,
    Then,
} from '@cucumber/cucumber';

When('clicks on {string} icon', async function (name) {
    await this.pdf.click_exp_pdf(name);
});

When('clicks on download pdf', async function () {
    await this.pdf.click_download_pdf();
});