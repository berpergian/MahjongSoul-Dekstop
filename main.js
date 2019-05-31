// Modules to control application life and create native browser window
const {app, BrowserWindow, remote} = require('electron')

var path = require('path');
var fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let initPath

function createWindow () {
  initPath = path.join(app.getPath('userData'), "init.json");
  var data = loadWindowData();

  // Create the browser window.
  mainWindow = new BrowserWindow((data && data.bounds)  ? data.bounds : {
    width: 1024,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    },
    frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //mainWindow.setResizable(false);
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function loadWindowData () {
  var data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  }
  catch(e) {
  }

  return data;
}

function saveWindowData (data) {
  fs.writeFileSync(initPath, JSON.stringify(data));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  var sizeWindow = mainWindow.getContentBounds();

  var data = {
    bounds: {
      width: sizeWindow['width'],
      height: sizeWindow['height'],
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      },
      frame: false
    }
  };
  saveWindowData(data);
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
