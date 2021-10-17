const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

function createWindow () {
  const viewport = new BrowserWindow({
    width: 300,
    height: 600,
    backgroundColor: '#1A1A1A',
    webPreferences: {
      nodeIntegration: true,
    },
  })
  viewport.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )
  // For debugging
  win.webContents.openDevTools()
  // Remove default menu
  viewport.removeMenu()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})