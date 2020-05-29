const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');
const debug = require('electron-debug');
const os = require('os');

const serve = require('../serve.js');

/* NOTE: require .env configuration */
require('dotenv').config();

/* NOTE: set window object */
let mainWindow = null;

/* NOTE: activate debugging if in dev mode */
process.env.NODE_ENV === 'development' && debug();

/* NOTE: extension installer */
const _installExtensions = () => {
  /* NOTE: provide extension location in .env for extensions */
  const extensions = [process.env.REACT_DEVTOOLS, process.env.REDUX_DEVTOOLS];
  /* NOTE: load devtools */
  extensions.map(extension => {
    session.defaultSession.loadExtension(
      path.join(os.homedir(), extension)
    );
  });
};

const createWindow = async () => {

  /* NOTE: define web preferences */
  const webPreferences = {};

  /* NOTE: install dev extensions if developing */
  if (process.env.NODE_ENV === 'development') {
    serve();
    _installExtensions();
    webPreferences.preload = path.join(__dirname, 'preload.js');
  };

  /* NOTE: Create the browser window */
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences,
  });

  /* NOTE: load html file */
  process.env.NODE_ENV === 'development'
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile('./index.html');

  /* NOTE: show and focus application on load finish window */
  mainWindow.webContents.on('did-finish-load', () => {
    try {
      mainWindow.show();
      mainWindow.focus();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    };
  });

  /* NOTE: close window if closed */
  mainWindow.on('closed', () => mainWindow = null);

  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { label: 'Change Source List' }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
};

/* NOTE: close if all windows closed (MacOS is stays in background) */
app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit();
});

/* NOTE: create window */
app.on('ready', createWindow);

/* NOTE: create a new window if none already open */
app.on('activate', () => {
  !mainWindow && createWindow();
});