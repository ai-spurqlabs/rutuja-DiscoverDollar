// Comment Module Locators
// Separate locators file for comment-related UI elements

const commentModuleLocators = {
  // Comment Section Elements
  commentsSection: '.comments-section, [class*="comment"], .comment-container',
  commentsView: '.comments-view, .comment-list, [data-testid="comments"]',
  commentButton: '[data-testid="comment-btn"], .comment-btn, button:has-text("Comments")',
  commentInput: '[data-testid="comment-input"], .comment-input, textarea[placeholder*="comment"]',
  commentVisibilityDropdown: '[data-testid="visibility-dropdown"], .visibility-select, select[name*="visibility"]',
  postCommentButton: '[data-testid="post-comment"], .post-btn, button:has-text("Post")',
  commentList: '.comment-list, .comments-list, [class*="comment-item"]',
  individualComment: '.comment-item, .comment, [class*="comment"]',

  // Comment Visibility Options
  internalVisibility: '[data-testid="internal-visible"], .internal-option, option[value="INTERNAL"]',
  externalVisibility: '[data-testid="external-visible"], .external-option, option[value="EXTERNAL"]',
  visibilityTextInternal: ':text("INTERNALLY VISIBLE")',
  visibilityTextExternal: ':text("EXTERNALLY VISIBLE")',

  // Comment Display Elements
  commentContent: '.comment-content, .comment-text, [class*="comment-body"]',
  commentAuthor: '.comment-author, .comment-user, [class*="comment-user"]',
  commentTimestamp: '.comment-timestamp, .comment-date, [class*="comment-time"]',
  commentVisibility: '.comment-visibility, [class*="comment-visibility"]',

  // Validation Messages
  validationMessage: '.validation-message, .error-message, [class*="error"]',
  emptyCommentError: ':text("Comment cannot be empty")',
  longCommentError: ':text("Comment exceeds maximum length")',
  characterCount: '.character-count, [class*="char-count"]',

  // Navigation Elements
  claimDetailsWindow: '.claim-details, .claim-window, [class*="claim-detail"]',
  claimHistoryTab: '[data-testid="claim-history"], .history-tab, button:has-text("Claim History")',
  claimHistorySection: '.claim-history, .history-section, [class*="history"]',
  historyComment: '.history-comment, [class*="history-item"]',

  // Notification Elements
  notificationArea: '.notification, .toast, [class*="notification"]',
  emailNotification: '.email-notification, [class*="email"]',

  // User Role Indicators
  userRoleIndicator: '.user-role, [class*="role"]',
  auditorRole: ':text("Auditor")',
  managerRole: ':text("Manager")',
  externalAuditorRole: ':text("External Auditor")',

  // Loading and State Elements
  loadingSpinner: '.loading, .spinner, [class*="loading"]',
  commentLoading: '.comment-loading, [class*="comment-loading"]',
  saveInProgress: '.saving, [class*="saving"]',

  // Modal and Dialog Elements
  commentModal: '.comment-modal, [role="dialog"]',
  confirmDialog: '.confirm-dialog, [class*="confirm"]',
  cancelButton: '[data-testid="cancel"], .cancel-btn, button:has-text("Cancel")',

  // Search and Filter Elements
  commentSearch: '.comment-search, input[placeholder*="search"]',
  commentFilter: '.comment-filter, select[name*="filter"]',
  dateFilter: '.date-filter, [class*="date-filter"]',

  // Accessibility Elements
  commentAriaLabel: '[aria-label*="comment"]',
  commentAriaDescribedBy: '[aria-describedby*="comment"]',

  // Mobile Responsive Elements
  mobileCommentToggle: '.mobile-comment-toggle, [class*="mobile"]',
  responsiveCommentSection: '.responsive-comments, [class*="responsive"]'
};

export default commentModuleLocators;
