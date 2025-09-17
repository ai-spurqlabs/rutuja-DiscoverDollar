import { When, Then } from "@cucumber/cucumber";

When('user logs in to {string} with {string}', async function (account, jwtfile) {
  await this.bucketValidation.LogintoAccount(account, jwtfile);
});

When(
  'user visits {string} and searches for claimno {string}',
  async function (bucket, claimno) {
    if (bucket != '') {
      await this.bucketValidation.FindClaimInBucket(bucket, claimno);
    }
  }
);

When(
  'user visits {string} applies {string} filter and selects first claim',
  async function (bucket, user) {
    await this.bucketValidation.ApplyFilter(bucket, user);
  }
);

When(
  'user visits {string} applies {string} filter applies {string} filter and selects first claim',
  async function (bucket, user, stat) {
    if (bucket != '') {
      if (bucket == 'Manage') {
        await this.bucketValidation.ApplyFilterManage(bucket, user, stat);
      } else {
        await this.bucketValidation.ApplyFilter(bucket, user, stat);
      }
    }
  }
);

When(
  'user changes status to {string} assigns to {string} comment {string}',
  async function (status, assignee, comment) {
    if ((status && assignee) != '') {
      await this.bucketValidation.ChangeStatus(status, assignee, comment);
    }
  }
);

Then(
  'user visits {string} bucket and verifies claimno is present and status',
  async function (target) {
    if (target != '') {
      await this.bucketValidation.VerifyBucket(target);
    }
  }
);
