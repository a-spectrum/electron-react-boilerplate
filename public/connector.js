const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  showInfo: (args) => ipcRenderer.invoke('show-info', args),
  searchForSet: (args) => ipcRenderer.invoke('search-for-sets', args),
  getAllSets: (args) => ipcRenderer.invoke('return-all-sets', args),
  loadSets: (args) => ipcRenderer.invoke('load-sets', args),
  updateSet: (args) => ipcRenderer.invoke('update-set', args),

  initDb: (args) => ipcRenderer.send('init-database', args),

  // getSetInfo: (args) => ipcRenderer.invoke('get-set-info', args),
  // addSetInfo: (args) => ipcRenderer.invoke('add-set-info', args),
  // Send Methods
  // testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});
