import 'dotenv/config';

import { BeforeAll, AfterAll, Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import LoginUtils from './loginUtils.js';
import ErrorReporter from './ErrorReporter.js';
import CommentMCPTools from './commentMCPTools.js';

// Import all page objects
import AddExternalPage from '../pages/AddExternalPage.js';
import Addrefdoc from '../pages/Addrefdoc.js';
import alloc from '../pages/allocate.js';
import BucketValidationPage from '../pages/BucketValidationPage.js';
import BulkClaimpage from '../pages/Bulk Claimpage.js';
import BulkClaimSheetPage from '../pages/BulkClaimSheetPage.js';
import BulkStatusChange from '../pages/BulkStatusChange.js';
import CancelClaimPage from '../pages/CancelClaimPage.js';
import CancellationAmountPage from '../pages/CancellationAmountPage.js';
import ClaimAgingPage from '../pages/ClaimAgingPage.js';
import ClaimCorrectionPage from '../pages/ClaimCorrectionPage.js';
import ClaimDetails from '../pages/ClaimDetails.js';
import CommentModulePage from '../pages/CommentModulePage.js';
import CommentModuleCorePage from '../pages/CommentModuleCorePage.js';
import CommentModulePage_New from '../pages/CommentModulePage_New.js';
import CopyClaimNoPage from '../pages/CopyClaimNoPage.js';
import CostdownPage from '../pages/CostdownPage.js';
import DashBannerPage from '../pages/DashBannerPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import DD_TemplatePage from '../pages/DD_TemplatePage.js';
import DeleteRefDocPage from '../pages/DeleteRefDocPage.js';
import export_claimsheet from '../pages/export_claimsheet.js';
import FGL_ClaimPage from '../pages/FGL_ClaimPage.js';
import FGL_UpldBulkPage from '../pages/FGL_UpldBulkPage.js';
import Filter_SuggPage from '../pages/Filter_SuggPage.js';
import GlobalSearchPage from '../pages/GlobalSearchPage.js';
import HomePage from '../pages/HomePage.js';
import IntExtCommentsPage from '../pages/IntExtCommentsPage.js';
import ManualClaimPage from '../pages/ManualClaimPage.js';
import Naming_ConventionPage from '../pages/Naming_ConventionPage.js';
import notification from '../pages/notification.js';
import pdf_export from '../pages/pdf_export.js';
import PostedNotCollectedAmountPage from '../pages/PostedNotCollectedAmountPage.js';
import ReviewPage from '../pages/ReviewPage.js';
import usercolPage from '../pages/usercolPage.js';
import ValidateID_Page from '../pages/ValidateID_Page.js';
import VFB_ClaimPage from '../pages/VFB_ClaimPage.js';

let browser;
let context;
let page;
let errorReporter;

// expose as globals so other modules can access them if needed
globalThis.browser = null;
globalThis.context = null;
globalThis.page = null;
globalThis.errorReporter = null;

class CustomWorld {
  constructor() {
    // page will be set in Before hook; initialize to null and create page objects later
    this.page = null;
    this.addExternal = null;
    this.addrefdoc = null;
    this.allocate = null;
    this.bucketValidation = null;
    this.bulkClaim = null;
    this.bulkClaimSheet = null;
    this.bulkStatusChange = null;
    this.cancelClaim = null;
    this.cancellationAmount = null;
    this.claimAging = null;
    this.claimCorrection = null;
    this.claimDetails = null;
    this.commentModule = null;
    this.commentModuleCore = null;
    this.commentModuleNew = null;
    this.commentMCPTools = null;
    this.copyClaimNo = null;
    this.costdown = null;
    this.dashBanner = null;
    this.dashboard = null;
    this.ddTemplate = null;
    this.deleteRefDoc = null;
    this.exportClaimSheet = null;
    this.fglClaim = null;
    this.fglUploadBulk = null;
    this.filterSugg = null;
    this.globalSearch = null;
    this.home = null;
    this.intExtComments = null;
    this.manualClaim = null;
    this.namingConvention = null;
    this.notification = null;
    this.pdfExport = null;
    this.postedNotCollectedAmount = null;
    this.review = null;
    this.usercol = null;
    this.validateID = null;
    this.vfbClaim = null;
  }

  // call this after this.page is set (from the Before hook)
  initPages() {
    // No need to pass this.page since pages use globalThis.page directly
    this.addExternal = new AddExternalPage();
    this.addrefdoc = new Addrefdoc();
    this.allocate = new alloc();
    this.bucketValidation = new BucketValidationPage();
    this.bulkClaim = new BulkClaimpage();
    this.bulkClaimSheet = new BulkClaimSheetPage();
    this.bulkStatusChange = new BulkStatusChange();
    this.cancelClaim = new CancelClaimPage();
    this.cancellationAmount = new CancellationAmountPage();
    this.claimAging = new ClaimAgingPage();
    this.claimCorrection = new ClaimCorrectionPage();
    this.claimDetails = new ClaimDetails();
    this.commentModule = new CommentModulePage();
    this.commentModuleCore = new CommentModuleCorePage();
    this.commentModuleNew = new CommentModulePage_New();
    this.commentMCPTools = new CommentMCPTools();
    this.copyClaimNo = new CopyClaimNoPage();
    this.costdown = new CostdownPage();
    this.dashBanner = new DashBannerPage();
    this.dashboard = new DashboardPage();
    this.ddTemplate = new DD_TemplatePage();
    this.deleteRefDoc = new DeleteRefDocPage();
    this.exportClaimSheet = new export_claimsheet();
    this.fglClaim = new FGL_ClaimPage();
    this.fglUploadBulk = new FGL_UpldBulkPage();
    this.filterSugg = new Filter_SuggPage();
    this.globalSearch = new GlobalSearchPage();
    this.home = new HomePage();
    this.intExtComments = new IntExtCommentsPage();
    this.manualClaim = new ManualClaimPage();
    this.namingConvention = new Naming_ConventionPage();
    this.notification = new notification();
    this.pdfExport = new pdf_export();
    this.postedNotCollectedAmount = new PostedNotCollectedAmountPage();
    this.review = new ReviewPage();
    this.usercol = new usercolPage();
    this.validateID = new ValidateID_Page();
    this.vfbClaim = new VFB_ClaimPage();
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS === '1', channel: 'msedge' });
  errorReporter = new ErrorReporter();
  globalThis.errorReporter = errorReporter;
});

AfterAll(async function () {
  if (browser) await browser.close();
});

// Tagged hooks for different roles - always login
Before({ tags: '@auditor', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 }); // Verify URL after login
});

Before({ tags: '@audit_manager', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Audit_Manager,
    process.env.AM_Password,
    process.env.AM_SecretKey
  );
  if (!success) {
    throw new Error('Audit Manager login failed');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@audit_reviewer', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Audit_Reviewer,
    process.env.AR_Password,
    process.env.AR_SecretKey
  );
  if (!success) {
    throw new Error('Audit Reviewer login failed');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@test1', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@test4', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@auditor-reviewer-verification', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed for auditor-reviewer-verification');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@comprehensive-comment-visibility', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed for comprehensive-comment-visibility');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@test5', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed for test5');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

Before({ tags: '@test6', timeout: 120000 }, async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  // set globals
  globalThis.browser = browser;
  globalThis.context = context;
  globalThis.page = page;
  // initialize page objects on the World
  if (typeof this.initPages === 'function') this.initPages();

  // Setup console log capturing
  if (errorReporter) {
    errorReporter.setupConsoleCapture(page);
  }

  const loginUtils = new LoginUtils(page);
  const success = await loginUtils.loginWithTOTP(
    process.env.Auditor,
    process.env.A_Password,
    process.env.A_SecretKey
  );
  if (!success) {
    throw new Error('Auditor login failed for test6');
  }
  await page.goto(process.env.Cantire_Stage_URL, { timeout: 60000 });
});

// Add similar Before hooks for other roles (e.g., @peerReviewer)

After(async function (scenario) {
  try {
    // Check if the scenario failed
    if (scenario && scenario.result && scenario.result.status === 'failed') {
      console.log(`Scenario failed: ${scenario.pickle.name}`);
      console.log('Capturing comprehensive error details...');

      // Capture page details before closing
      if (page && errorReporter) {
        try {
          const testName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
          const error = new Error(scenario.result.exception?.message || 'Test scenario failed');

          await errorReporter.capturePageDetails(page, testName, error);
          console.log('Error details captured successfully');
        } catch (captureError) {
          console.error('Failed to capture error details:', captureError.message);
        }
      }
    }

    // Close page
    if (page) {
      await Promise.race([
        page.close(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Page close timeout')), 10000))
      ]);
    }
  } catch (error) {
    console.warn('Error in After hook:', error.message);
  }

  try {
    // Close context
    if (context) {
      await Promise.race([
        context.close(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Context close timeout')), 10000))
      ]);
    }
  } catch (error) {
    console.warn('Error closing context:', error.message);
  }
});
