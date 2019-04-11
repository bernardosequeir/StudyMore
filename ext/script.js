/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
let isStudying;
let blockedSites;

const toggleButton = document.getElementById('toggle');
const blockUrl = document.getElementById('blockUrl');
const blockButton = document.getElementById('block');
const blockedSitesList = document.getElementById('blockedSites');

function setStudying() {
  if (isStudying === null) {
    isStudying = true;
    chrome.storage.sync.set({ isStudying: true });
  }
  if (!isStudying) {
    isStudying = true;
    chrome.storage.sync.set({ isStudying: true });
    console.log(localStorage);
  } else if (isStudying) {
    isStudying = false;
    chrome.storage.sync.set({ isStudying: false });
    console.log(localStorage);
  }
}

function displayBlocked() {
  chrome.storage.sync.get(['blockedSites'], function(obj) {
    blockedSites = obj.blockedSites;
  });
  const sites = `<ul>${blockedSites
    .map(
      site =>
        `<li><a href="${site}">${site.split('://')[1].split('/')[0]}</a></li>`
    )
    .join('')}</ul>`;
  blockedSitesList.innerHTML = sites;
}

function addBlockedSite() {
  console.log(blockedSites);
  const siteToBlock = blockUrl.value;
  if (blockedSites === undefined) {
    chrome.storage.sync.set({ blockedSites: [siteToBlock] });
  } else {
    blockedSites.push(siteToBlock);
    chrome.storage.sync.set({ blockedSites });
    displayBlocked();
  }
}

toggleButton.addEventListener('click', setStudying);
blockButton.addEventListener('click', addBlockedSite);
chrome.storage.sync.get(['isStudying'], function(obj) {
  isStudying = obj;
});
