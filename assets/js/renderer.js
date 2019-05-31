const elec = require('electron');
const remote = elec.remote;
const winNow = remote.getCurrentWindow();

window.onresize = doLayout;

var ById = function (id) {
    return document.getElementById(id);
}

var view = ById('view'),
    cacc = ById('cache-btn'),
    cook = ById('cookies-btn'),
    reld = ById('reload-btn'),
    minz = ById('min-btn'),
    clos = ById('close-btn');

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  // Test for the presence of the experimental <webview> zoom and find APIs.
  if (typeof(webview.setZoom) == "function" &&
      typeof(webview.find) == "function") {
  }
};

function getMenubarHeight() {
  var controls = document.querySelector('#menu-bar');
  if (controls) {
    return controls.offsetHeight;
  } else {
    return 0;
  }
}

function doLayout() {
  var webview = document.querySelector('webview');
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;

  var controlsHeight = getMenubarHeight();

  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
}

function deleteCache() {
    if (confirm("Are you sure to delete cache?")) {
        winNow.webContents.session.clearCache(function(){});
        alert("Cache deleted");
        reloadPage();
    }
}

function deleteCookies() {
    if (confirm("Are you sure to delete cookies?")) {
        winNow.webContents.session.clearStorageData([], function (data) {});
        alert("Cookies deleted");
        reloadPage();
    }
}

function reloadPage () {
    view.reload();
}

function closeWindow(){
    winNow.close();
}

function minimizeWindow(){
    winNow.minimize();
}

document.addEventListener("keydown", function (e) {
    if (e.which === 116) {
        reloadPage();
    }
});

cacc.addEventListener('click', deleteCache);
cook.addEventListener('click', deleteCookies);
reld.addEventListener('click', reloadPage);
clos.addEventListener('click', closeWindow);
minz.addEventListener('click', minimizeWindow);