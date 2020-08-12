const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const server = require('./app');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        backgroundColor: "#D6D8DC"
    })
  // and load the index.html of the app.
  //win.loadFile('index.html')
    win.loadURL('http://localhost:5000/');
  // Open the DevTools.
  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

/*
window.once('ready-to-show', () => {
    window.show()
  })
 */
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})