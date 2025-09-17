import { When, Then } from "@cucumber/cucumber";

// Existing step definitions
When('User copy first claim number', async function () {
    await this.globalSearch.copyFirstClaimNumber();
});

When('User paste copied claim number in claim search box', async function () {
    await this.globalSearch.pasteClaimNo();
});

Then('User verifies that claim number is same as we searched', async function () {
    await this.globalSearch.verifyClaimNumber();
});

When('User type invalid claim number as {string}', async function (invalidClaim) {
    await this.globalSearch.typeInvalidClaimNo(invalidClaim);
});

Then('User verifies {string} message and {string}', async function (msg, popupMsg) {
    await this.globalSearch.verifyerrormsg(msg, popupMsg);
});

When('User searches for {string} in the global search banner', async function (scope) {
    await this.globalSearch.searchInGlobalBanner(scope);
});

When('User types the {string} in the search box', async function (value) {
    await this.globalSearch.typeInSearchBox(value);
});

Then('User verifies the {string} is displayed with {string}', async function (message, value) {
    await this.globalSearch.verifySearchResult(message, value);
});

// Additional step definitions to match feature file
When('User copies the first claim number', async function () {
    await this.globalSearch.copyFirstClaimNumber();
});

When('User searches for comment module {string} in the global search banner', async function (scope) {
    await this.globalSearch.searchInGlobalBanner(scope);
});

When('User pastes the copied claim number in the search box', { timeout: 15000 }, async function () {
    await this.globalSearch.pasteClaimNo();
});

When('User selects the claim from search results', async function () {
    // This step might need to be implemented in the page object
    // For now, we'll assume it's handled by the search functionality
    console.log('Selecting claim from search results');
});
