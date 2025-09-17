import { When, Then } from "@cucumber/cucumber";

When('user log in to {string} with {string}', async function (acct, jwt) {
    await this.comm.userlogin(acct, jwt);
});

When('user chooses {string}', async function (bucket) {
    if (bucket === "MANAGE") {
        await this.comm.clickManage();
    } else {
        await this.comm.clickbucket(bucket);
    }
});

When('user filters claimno and selects it for {string} {string}', async function (account, bucket) {
    if (account === "Audit Reviewer" && bucket === "APPROVE") {
        await this.comm.selectClaimAR();
    } else {
        await this.comm.selectClaimA();
    }
});

When('user clicks on comments button in claim details view', async function () {
    await this.comm.clickComment();
});

Then('user {string} comment {string} and {string} with {string} also {string}', async function (verify, equality, addcom, content, visibility) {
    if (verify === "") {
        await this.comm.verifyComment(verify, equality);
    } else if (addcom === "no") {
        if (visibility !== "") {
            await this.comm.setVisibility(visibility);
        } else {
            await this.comm.addComment(content);
        }
    }
});
