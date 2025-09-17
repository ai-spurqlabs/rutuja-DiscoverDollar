import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

class ErrorReporter {
  constructor() {
    this.errorReports = [];
    this.terminalLogs = [];
  }

  /**
   * Capture comprehensive page details before browser closes
   * @param {Page} page - Playwright page object
   * @param {string} testName - Name of the failing test
   * @param {Error} error - The error that occurred
   */
  async capturePageDetails(page, testName, error) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportDir = path.join(process.cwd(), 'error-reports');
    const reportFile = path.join(reportDir, `error-report-${testName}-${timestamp}.json`);

    // Ensure directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      testName: testName,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      pageDetails: {},
      terminalLogs: this.terminalLogs,
      metadata: {
        nodeVersion: process.version,
        platform: process.platform,
        cwd: process.cwd(),
        environment: process.env.NODE_ENV || 'development'
      }
    };

    try {
      // Capture page URL and title
      report.pageDetails.url = page.url();
      report.pageDetails.title = await page.title();

      // Capture page HTML
      report.pageDetails.html = await page.content();

      // Capture page screenshot
      const screenshotPath = path.join(reportDir, `screenshot-${testName}-${timestamp}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        type: 'png'
      });
      report.pageDetails.screenshotPath = screenshotPath;

      // Capture console logs (if any were captured during test)
      report.pageDetails.consoleLogs = await this.getConsoleLogs(page);

      // Capture network requests
      report.pageDetails.networkRequests = await this.getNetworkRequests(page);

      // Capture page metrics
      report.pageDetails.metrics = await this.getPageMetrics(page);

      // Capture element information
      report.pageDetails.elementInfo = await this.getElementInfo(page);

      // Capture local storage and session storage
      report.pageDetails.storage = await this.getStorageData(page);

      // Capture cookies
      report.pageDetails.cookies = await page.context().cookies();

      // Capture viewport and device info
      report.pageDetails.viewport = await page.viewportSize();
      report.pageDetails.userAgent = await page.evaluate(() => navigator.userAgent);

    } catch (captureError) {
      console.error('Error capturing page details:', captureError);
      report.captureErrors = captureError.message;
    }

    // Save the report
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`Error report saved to: ${reportFile}`);

    // Add to reports array for potential batch processing
    this.errorReports.push(report);

    return report;
  }

  /**
   * Get console logs from the page
   */
  async getConsoleLogs(page) {
    // Return captured console logs
    return this.getCapturedConsoleLogs();
  }

  /**
   * Get network requests information
   */
  async getNetworkRequests(page) {
    const requests = [];

    // Set up request/response monitoring if not already done
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        timestamp: new Date().toISOString()
      });
    });

    page.on('response', response => {
      const request = requests.find(r => r.url === response.url());
      if (request) {
        request.status = response.status();
        request.statusText = response.statusText();
        request.responseHeaders = response.headers();
      }
    });

    // Wait a moment for any pending requests
    await page.waitForTimeout(1000);

    return requests.slice(-50); // Return last 50 requests
  }

  /**
   * Get page performance metrics
   */
  async getPageMetrics(page) {
    try {
      const metrics = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart,
          memoryUsage: performance.memory ? {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit
          } : null
        };
      });
      return metrics;
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Get information about key elements on the page
   */
  async getElementInfo(page) {
    try {
      const elementInfo = await page.evaluate(() => {
        const info = {};

        // Count various element types
        info.totalElements = document.querySelectorAll('*').length;
        info.buttons = document.querySelectorAll('button').length;
        info.inputs = document.querySelectorAll('input').length;
        info.links = document.querySelectorAll('a').length;
        info.images = document.querySelectorAll('img').length;

        // Check for common UI elements
        info.hasNavigation = !!document.querySelector('.nav, nav, .navbar');
        info.hasSearch = !!document.querySelector('input[type="search"], input[placeholder*="search" i]');
        info.hasLoading = !!document.querySelector('.loading, .spinner, .loader');

        // Get visible text content (first 1000 characters)
        const bodyText = document.body.textContent || '';
        info.visibleText = bodyText.substring(0, 1000) + (bodyText.length > 1000 ? '...' : '');

        return info;
      });

      return elementInfo;
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Get local and session storage data
   */
  async getStorageData(page) {
    try {
      const storageData = await page.evaluate(() => {
        const data = {
          localStorage: {},
          sessionStorage: {}
        };

        // Get localStorage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            data.localStorage[key] = localStorage.getItem(key);
          }
        }

        // Get sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) {
            data.sessionStorage[key] = sessionStorage.getItem(key);
          }
        }

        return data;
      });

      return storageData;
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Add terminal log entry
   */
  addTerminalLog(log) {
    this.terminalLogs.push({
      timestamp: new Date().toISOString(),
      log: log
    });
  }

  /**
   * Add console log from page
   */
  addConsoleLog(log) {
    if (!this.currentConsoleLogs) {
      this.currentConsoleLogs = [];
    }
    this.currentConsoleLogs.push({
      timestamp: new Date().toISOString(),
      level: log.type(),
      text: log.text()
    });
  }

  /**
   * Setup console log capturing for a page
   */
  setupConsoleCapture(page) {
    page.on('console', (msg) => {
      this.addConsoleLog(msg);
    });
  }

  /**
   * Get captured console logs
   */
  getCapturedConsoleLogs() {
    return this.currentConsoleLogs || [];
  }

  /**
   * Generate summary report of all captured errors
   */
  generateSummaryReport() {
    const summary = {
      totalReports: this.errorReports.length,
      reports: this.errorReports.map(report => ({
        testName: report.testName,
        timestamp: report.timestamp,
        error: report.error.message,
        url: report.pageDetails.url,
        reportFile: `error-report-${report.testName}-${report.timestamp.replace(/[:.]/g, '-')}.json`
      }))
    };

    const summaryPath = path.join(process.cwd(), 'error-reports', 'summary-report.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

    return summaryPath;
  }
}

export default ErrorReporter;
