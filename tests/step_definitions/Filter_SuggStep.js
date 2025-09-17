import { When, Then } from "@cucumber/cucumber";

When('On {string} User click on {string} filter', async function (page, filter) {
    await this.filterSugg.clickfiltericon(page, filter);
});

Then('User verifies Filter suggestions', async function (datatable) {
    for (const elem of datatable.hashes()) {
        await this.filterSugg.verifiesFilterSugg(elem.filterOption, elem.position);
    }
});
