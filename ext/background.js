/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
let sitesBlocked;
chrome.storage.sync.get(['blockedSites'], function(obj) {
  blockedSites = obj.blockedSites;
});
const tabUrl = window.location.hostname;
console.log(tabUrl);
if (tabUrl in JSON.parse(sitesBlocked)) {
  window.location.href = 'home.html';
}
