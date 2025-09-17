// Example locator file
module.exports = {
  // Login Page locators
  username: '#username',
  password: '#password',
  loginButton: 'button[type="submit"]',
  signInWithMicrosoft: 'div.microsoft',

  // Microsoft Login locators
  msUsername: 'input[name="loginfmt"]',
  msPassword: 'input[name="passwd"]',
  msSubmit: 'input[type="submit"]',
  msOtp: 'input[name="otp"]',

  // Dashboard locators
  welcomeMessage: '.welcome-msg',
  logoutButton: '#logout',

  // Addrefdoc locators (use MCP refs for reliability)
  left_nav_menu: '[ref="e25"]',
  review: "[style=''] > :nth-child(1) > .btn-link",
  manage: "div.nav-item > li > img:nth-child(2)",
  claims_button: '[ref="e197"]',
  crossManage: ".cross > img",
  first_claimNum: '[ref="e416"]',
  refdoc_table: ".attachment-container",
  first_refdoc: ".tableContent > :nth-child(2) > :nth-child(1)",
  addnew_refdoc: ".add-new",
  upload_refdoc: ".dd-text > :nth-child(2)",
  select_dropdown: "div[role='dialog']",
  select_filetype: ".inputField",
  submit_filetype: "app-file-type-picker.ng-star-inserted > :nth-child(2)",
  submit_filetypes: "app-file-type-picker.ng-star-inserted > :nth-child(3)",
  success_message: ".toast-success",
  uploaded_refdoc: ".files-table > .tableContent",
  resolve: "[style=''] > :nth-child(2) > .btn-link",
  followup: "[style=''] > :nth-child(3) > .btn-link",
  download_refdoc: "img[src$='download.svg']",
  download_toast: ".ng-trigger",
  searchClaimNumber: "input[placeholder='Search']",
  search_item: "li[role='option']",
  closeBt: ".footer > :nth-child(2) > button",
  approve: "[style=''] > :nth-child(4) > .btn-link",
  Claim_Number_Filter: ":nth-child(3) > .p-d-flex > .column-actions-container > :nth-child(1)",
  UserFilterSearch: "p-columnfilterformelement > p-autocomplete > span > input",
  UserFilterResult: ".p-autocomplete-item",
  // STATUS column filter button on Manage Claims page
  status_filter: '[ref="e359"]',
  // alternate MCP ref observed in some snapshots when the DOM was different
  status_filter_alt: '[ref="e103"]',
  status_dropdown: ".p-dropdown-trigger",
  approver_input: "input[placeholder='Search Approver']",
  comment_input: "div.p-editor-content",
  submit_status_change: ".change-status-form__action > .btn-link",
  rowsPath: "tr[class='ng-star-inserted']",
  conformDelYes: ".p-confirm-dialog-accept",
  selectfiletype: "select[placeholder='Select File Type']"

  // Add more locators as needed
};
