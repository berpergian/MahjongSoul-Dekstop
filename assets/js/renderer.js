const elec = require('electron');
const remote = elec.remote;
const winNow = remote.getCurrentWindow();

var ById = function (id) {
    return document.getElementById(id);
}

var view = ById('view'),
    cacc = ById('cache-btn'),
    cook = ById('cookies-btn'),
    reld = ById('reload-btn'),
    minz = ById('min-btn'),
    clos = ById('close-btn');

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