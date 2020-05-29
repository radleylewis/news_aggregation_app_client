const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');
const debug = require('electron-debug');
const os = require('os');

/* NOTE: require .env configuration */
require('dotenv').config();

/* NOTE: set window object */
let mainWindow: any = null;

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
  /* NOTE: install dev extensions if developing */
  process.env.NODE_ENV === 'development' && _installExtensions();

  /* NOTE: Create the browser window */
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
  });

  /* NOTE: load html file */
  mainWindow.loadFile('./index.html');

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