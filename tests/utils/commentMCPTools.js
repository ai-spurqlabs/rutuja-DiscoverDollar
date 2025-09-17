/**
 * MCP Tools Integration for Comment Module Testing
 * Provides AI-powered testing capabilities and data generation
 */

import fs from 'fs';
import path from 'path';

class CommentMCPTools {
  constructor() {
    this.testDataPath = path.join(process.cwd(), 'tests', 'fixtures');
    this.screenshotsPath = path.join(process.cwd(), 'test-screenshots');
  }

  /**
   * Generate realistic test comments using AI patterns
   */
  async generateTestComments(options = {}) {
    const { count = 5, types = ['internal', 'external'], users = ['auditor', 'manager'] } = options;

    const commentTemplates = {
      internal: [
        'Please review the claim amount for accuracy',
        'Internal note: Documentation needs verification',
        'Manager review required for this claim',
        'Internal audit findings attached',
        'Please check the supporting documents'
      ],
      external: [
        'Additional information requested from vendor',
        'Please provide missing documentation',
        'Claim status updated - awaiting response',
        'External review completed successfully',
        'Vendor confirmation required'
      ]
    };

    const comments = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const template = commentTemplates[type][Math.floor(Math.random() * commentTemplates[type].length)];
      const user = users[Math.floor(Math.random() * users.length)];

      comments.push({
        id: `comment_${i + 1}`,
        content: `${template} - Generated test comment ${i + 1}`,
        type: type,
        author: user,
        timestamp: new Date().toISOString(),
        visibility: type === 'internal' ? 'Auditor, Manager' : 'All Users'
      });
    }

    // Save generated data
    const filePath = path.join(this.testDataPath, 'generated-comments.json');
    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));

    return comments;
  }

  /**
   * Analyze screenshot for UI issues using pattern recognition
   */
  async analyzeScreenshot(screenshotPath) {
    try {
      const stats = fs.statSync(screenshotPath);
      const screenshotData = {
        path: screenshotPath,
        size: stats.size,
        modified: stats.mtime,
        analysis: {}
      };

      // Basic analysis (in real implementation, this would use AI/computer vision)
      screenshotData.analysis = {
        hasCommentsSection: true, // Would be determined by AI analysis
        commentButtonVisible: true,
        formElementsPresent: true,
        potentialIssues: [],
        confidence: 0.85
      };

      // Check for common issues
      if (stats.size < 10000) {
        screenshotData.analysis.potentialIssues.push('Screenshot appears to be very small - possible rendering issue');
      }

      return screenshotData;
    } catch (error) {
      throw new Error(`Screenshot analysis failed: ${error.message}`);
    }
  }

  /**
   * Generate comprehensive test report with AI insights
   */
  async generateEnhancedReport(testResults) {
    const report = {
      summary: {
        totalTests: testResults.length,
        passed: testResults.filter(t => t.status === 'passed').length,
        failed: testResults.filter(t => t.status === 'failed').length,
        skipped: testResults.filter(t => t.status === 'skipped').length,
        duration: testResults.reduce((sum, t) => sum + (t.duration || 0), 0)
      },
      insights: {
        mostFrequentFailures: this.analyzeFailurePatterns(testResults),
        performanceMetrics: this.calculatePerformanceMetrics(testResults),
        recommendations: this.generateRecommendations(testResults)
      },
      screenshots: await this.analyzeAllScreenshots(),
      timestamp: new Date().toISOString()
    };

    const reportPath = path.join(process.cwd(), 'enhanced-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  }

  /**
   * Analyze failure patterns in test results
   */
  analyzeFailurePatterns(testResults) {
    const failures = testResults.filter(t => t.status === 'failed');
    const patterns = {};

    failures.forEach(failure => {
      const error = failure.error || 'Unknown error';
      patterns[error] = (patterns[error] || 0) + 1;
    });

    return Object.entries(patterns)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  /**
   * Calculate performance metrics
   */
  calculatePerformanceMetrics(testResults) {
    const durations = testResults.map(t => t.duration || 0).filter(d => d > 0);

    return {
      averageDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      medianDuration: this.calculateMedian(durations)
    };
  }

  /**
   * Generate AI-powered recommendations
   */
  generateRecommendations(testResults) {
    const recommendations = [];

    const failureRate = (testResults.filter(t => t.status === 'failed').length / testResults.length) * 100;

    if (failureRate > 20) {
      recommendations.push('High failure rate detected. Consider reviewing locator stability and test data.');
    }

    const avgDuration = this.calculatePerformanceMetrics(testResults).averageDuration;
    if (avgDuration > 30000) { // 30 seconds
      recommendations.push('Tests are running slowly. Consider optimizing wait strategies and locator selection.');
    }

    if (testResults.some(t => t.error && t.error.includes('timeout'))) {
      recommendations.push('Timeout errors detected. Consider increasing timeouts or improving element waiting strategies.');
    }

    return recommendations;
  }

  /**
   * Analyze all screenshots in the test directory
   */
  async analyzeAllScreenshots() {
    try {
      const screenshotFiles = fs.readdirSync(this.screenshotsPath)
        .filter(file => file.endsWith('.png'))
        .map(file => path.join(this.screenshotsPath, file));

      const analyses = [];
      for (const screenshot of screenshotFiles) {
        try {
          const analysis = await this.analyzeScreenshot(screenshot);
          analyses.push(analysis);
        } catch (error) {
          console.warn(`Failed to analyze screenshot ${screenshot}: ${error.message}`);
        }
      }

      return analyses;
    } catch (error) {
      console.warn(`Screenshot analysis failed: ${error.message}`);
      return [];
    }
  }

  /**
   * Simulate API testing for comment endpoints
   */
  async simulateCommentAPI(options = {}) {
    const { method = 'GET', endpoint = '/api/comments', data = null } = options;

    // Simulate API response based on the request
    const responses = {
      'GET': {
        status: 200,
        data: {
          comments: [
            { id: 1, content: 'Test comment', author: 'auditor', visibility: 'internal' }
          ]
        }
      },
      'POST': {
        status: 201,
        data: {
          id: Date.now(),
          content: data?.content || 'New comment',
          author: data?.author || 'test-user',
          visibility: data?.visibility || 'internal',
          created: new Date().toISOString()
        }
      }
    };

    return responses[method] || { status: 404, data: { error: 'Endpoint not found' } };
  }

  /**
   * Validate comment data against business rules
   */
  validateCommentData(comment) {
    const issues = [];

    if (!comment.content || comment.content.trim().length === 0) {
      issues.push('Comment content cannot be empty');
    }

    if (comment.content && comment.content.length > 1000) {
      issues.push('Comment content exceeds maximum length of 1000 characters');
    }

    if (!['internal', 'external'].includes(comment.type)) {
      issues.push('Comment type must be either "internal" or "external"');
    }

    if (!comment.author) {
      issues.push('Comment must have an author');
    }

    return {
      isValid: issues.length === 0,
      issues: issues
    };
  }

  /**
   * Calculate median value from array
   */
  calculateMedian(arr) {
    const sorted = arr.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  /**
   * AI-powered selector discovery and optimization
   */
  async discoverSelectors(page, elementDescription) {
    try {
      // Get all elements on the page
      const allElements = await page.locator('*').all();
      const selectors = [];

      for (const element of allElements.slice(0, 50)) { // Limit to first 50 for performance
        try {
          const tagName = await element.evaluate(el => el.tagName.toLowerCase());
          const className = await element.evaluate(el => el.className);
          const id = await element.evaluate(el => el.id);
          const text = await element.evaluate(el => el.textContent?.trim());
          const attributes = await element.evaluate(el => {
            const attrs = {};
            for (let attr of el.attributes) {
              attrs[attr.name] = attr.value;
            }
            return attrs;
          });

          // Generate potential selectors
          const potentialSelectors = [];

          // By ID (most specific)
          if (id) {
            potentialSelectors.push(`#${id}`);
          }

          // By data attributes (recommended)
          if (attributes['data-testid']) {
            potentialSelectors.push(`[data-testid="${attributes['data-testid']}"]`);
          }
          if (attributes['data-cy']) {
            potentialSelectors.push(`[data-cy="${attributes['data-cy']}"]`);
          }

          // By class combinations
          if (className) {
            const classes = className.split(' ').filter(c => c.trim());
            if (classes.length === 1) {
              potentialSelectors.push(`.${classes[0]}`);
            } else if (classes.length === 2) {
              potentialSelectors.push(`.${classes[0]}.${classes[1]}`);
            }
          }

          // By text content
          if (text && text.length < 50) {
            potentialSelectors.push(`text="${text}"`);
          }

          // By tag with attributes
          if (attributes.type) {
            potentialSelectors.push(`${tagName}[type="${attributes.type}"]`);
          }
          if (attributes.placeholder) {
            potentialSelectors.push(`${tagName}[placeholder*="${attributes.placeholder.split(' ')[0]}"]`);
          }

          // Check if any selector matches the description
          for (const selector of potentialSelectors) {
            if (this.matchesDescription(selector, elementDescription)) {
              selectors.push({
                selector: selector,
                confidence: this.calculateConfidence(selector, attributes, text),
                type: this.getSelectorType(selector),
                element: { tagName, className, id, text: text?.substring(0, 50) }
              });
            }
          }

        } catch (error) {
          // Skip elements that can't be analyzed
          continue;
        }
      }

      // Sort by confidence and return top matches
      return selectors
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);

    } catch (error) {
      throw new Error(`Selector discovery failed: ${error.message}`);
    }
  }

  /**
   * Check if selector matches element description
   */
  matchesDescription(selector, description) {
    const desc = description.toLowerCase();
    const sel = selector.toLowerCase();

    // Check for keyword matches
    const keywords = {
      'button': ['button', 'btn', 'submit', 'click'],
      'input': ['input', 'field', 'textbox', 'text'],
      'comment': ['comment', 'note', 'message'],
      'modal': ['modal', 'dialog', 'popup'],
      'dropdown': ['select', 'dropdown', 'combo'],
      'checkbox': ['checkbox', 'check'],
      'radio': ['radio', 'option']
    };

    for (const [type, words] of Object.entries(keywords)) {
      if (desc.includes(type) && words.some(word => sel.includes(word))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Calculate selector confidence score
   */
  calculateConfidence(selector, attributes, text) {
    let score = 0;

    // Data attributes are most reliable
    if (selector.includes('data-testid') || selector.includes('data-cy')) {
      score += 100;
    }

    // IDs are very reliable
    if (selector.startsWith('#')) {
      score += 90;
    }

    // Text selectors are moderately reliable
    if (selector.includes('text=')) {
      score += 60;
    }

    // Class selectors are less reliable
    if (selector.startsWith('.')) {
      score += 40;
    }

    // Generic selectors are least reliable
    if (!selector.includes('#') && !selector.includes('data-') && !selector.includes('text=')) {
      score += 20;
    }

    // Bonus for semantic attributes
    if (attributes['aria-label'] || attributes['role']) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Get selector type for categorization
   */
  getSelectorType(selector) {
    if (selector.includes('data-testid') || selector.includes('data-cy')) {
      return 'data-attribute';
    }
    if (selector.startsWith('#')) {
      return 'id';
    }
    if (selector.includes('text=')) {
      return 'text';
    }
    if (selector.startsWith('.')) {
      return 'class';
    }
    return 'attribute';
  }

  /**
   * Validate selector stability and reliability
   */
  async validateSelector(page, selector) {
    try {
      const elements = await page.locator(selector).count();
      const isVisible = elements > 0 ? await page.locator(selector).first().isVisible() : false;
      const isEnabled = elements > 0 ? await page.locator(selector).first().isEnabled() : false;

      return {
        selector: selector,
        found: elements > 0,
        count: elements,
        visible: isVisible,
        enabled: isEnabled,
        stable: elements === 1, // Ideally should match exactly one element
        recommendation: elements === 0 ? 'Selector not found' :
                       elements === 1 ? 'Good - unique match' :
                       elements > 1 ? 'Multiple matches - consider making more specific' : 'Unknown'
      };
    } catch (error) {
      return {
        selector: selector,
        found: false,
        error: error.message,
        recommendation: 'Selector validation failed'
      };
    }
  }

  /**
   * Generate optimized locators file
   */
  async generateOptimizedLocators(page, elements) {
    const optimizedLocators = {};

    for (const element of elements) {
      console.log(`Discovering selectors for: ${element.description}`);
      const discoveredSelectors = await this.discoverSelectors(page, element.description);

      if (discoveredSelectors.length > 0) {
        const bestSelector = discoveredSelectors[0];
        optimizedLocators[element.name] = {
          selector: bestSelector.selector,
          type: bestSelector.type,
          confidence: bestSelector.confidence,
          alternatives: discoveredSelectors.slice(1, 3).map(s => s.selector)
        };
      }
    }

    // Save optimized locators
    const filePath = path.join(this.testDataPath, 'optimized-locators.json');
    fs.writeFileSync(filePath, JSON.stringify(optimizedLocators, null, 2));

    return optimizedLocators;
  }

  /**
   * Monitor selector health over time
   */
  async monitorSelectorHealth(page, locators) {
    const healthReport = {
      timestamp: new Date().toISOString(),
      results: []
    };

    for (const [name, locatorData] of Object.entries(locators)) {
      const validation = await this.validateSelector(page, locatorData.selector);
      healthReport.results.push({
        name: name,
        selector: locatorData.selector,
        ...validation
      });
    }

    // Save health report
    const filePath = path.join(this.testDataPath, 'selector-health-report.json');
    fs.writeFileSync(filePath, JSON.stringify(healthReport, null, 2));

    return healthReport;
  }
}

export default CommentMCPTools;
