const {app, BrowserWindow} = require('electron');
const path = require('path');

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  win.setMenuBarVisibility(false);
  win.setTitle('Текстовый редактор');
  win.loadFile(path.join(__dirname, 'index.html'));
});

app.on('window-all-closed', () => app.quit());