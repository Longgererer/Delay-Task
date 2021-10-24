const path = require('path')
const { app, BrowserWindow, ipcMain, shell } = require('electron')
const isDev = require('electron-is-dev')
const Store = require('electron-store')
const store = new Store()

// 开机自启动
if (!isDev) {
  app.setLoginItemSettings({
    openAtLogin: !!store.get('openAtLogin'),
  })
}

function createWindow () {
  const viewport = new BrowserWindow({
    width: 320,
    height: 600,
    minWidth: 320,
    maxWidth: 500,
    backgroundColor: '#1a1a1a',
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  if (isDev) {
    viewport.loadURL("http://localhost:3000")
    viewport.webContents.openDevTools()
  } else {
    viewport.loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
  }

  viewport.on('ready-to-show', () => {
    viewport.show()
  })

  ipcMain.on('close-app', () => {
    if (viewport) {
      viewport.close()
    }
  })

  ipcMain.on('min-app', () => {
    viewport.minimize()
  })

  ipcMain.on('open-url', (_, url) => {
    shell.openExternal(url)
  })

  ipcMain.on('save-data', (_, key, val) => {
    store.set(key, val)
  })

  ipcMain.on('get-data', (event, key) => {
    event.returnValue = store.get(key)
  })

  ipcMain.on('del-all-records', () => {
    store.delete('taskList')
  })
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

app.on('ready', () => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.electron.delayTask')
  }
})