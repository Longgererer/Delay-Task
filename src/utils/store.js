import isElection from 'is-electron'
const { ipcRenderer } = require('electron')

export default (function localData () {
  if (isElection()) {
    return {
      set: (key, val) => { ipcRenderer.send('save-data', key, val) },
      get: (key) => {
        return ipcRenderer.sendSync('get-data', key)
      },
      del: (key) => { store.delete(key) }
    }
  }
  return {
    set: (key, val) => { localStorage.setItem(key, JSON.stringify(val)) },
    get: (key) => JSON.parse(localStorage.getItem(key) || 'false'),
    del: (key) => { localStorage.removeItem(key) }
  }
})()
