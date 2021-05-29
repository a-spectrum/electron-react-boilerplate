const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let splashScreen;
let mainWindow;

const DAO = require(isDev
    ? path.join(app.getAppPath(), './public/db/DAO')
    : path.join(app.getAppPath(), './build/db/DAO'));

const createWindow = () => {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: 'hidden',
        show: false,
        width: 600,
        height: 500,
        alwaysOnTop: false,
        webPreferences: {
            // The preload file where we will perform our app communication
            preload: isDev
                ? path.join(app.getAppPath(), './public/connector.js') // Loading it from the public folder for dev
                : path.join(app.getAppPath(), './build/connector.js'), // Loading it from the build folder for production
            worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
            contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
        },
    });
    // Setting Window Icon - Asset file needs to be in the public/images folder.
    mainWindow.setIcon(path.join(__dirname, './favicon/favicon.ico'));

    // Loading a webpage inside the electron window we just created
    // mainWindow.loadURL(
    //     isDev
    //         ? 'http://localhost:3000' // Loading localhost if dev mode
    //         : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
    // );

    // In development mode, if the window has loaded, then load the dev tools.
    if (isDev) {
        mainWindow.webContents.on('did-frame-finish-load', () => {
            mainWindow.webContents.openDevTools({mode: 'right'});
        });
    }
};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
    'userData',
    isDev
        ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
        : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
    createWindow();

    splashScreen = new BrowserWindow({width: 600, height: 250, transparent: false, frame: false, alwaysOnTop: true});
    // splashScreen.setOpacity(0.5); // works for the entire window! :D
    // splashScreen.setSize(width, height);
    splashScreen.loadURL(`file://${path.join(__dirname, 
            '../build/splashscreen.html')}`
    );
    // splashScreen.webContents.openDevTools({mode: 'detach'});

    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname,
            '../build/index.html')}`
    );

    mainWindow.once('ready-to-show', () => {
        setInterval(() => {
            splashScreen.destroy();
            mainWindow.show();
        }, 3000);
    });


    // If you want to add React Dev Tools
    // if (isDev) {
    //   await session.defaultSession
    //     .loadExtension(
    //       path.join(__dirname, `../userdata/extensions/react-dev-tools`) // This folder should have the chrome extension for React Dev Tools. Get it online or from your Chrome extensions folder.
    //     )
    //     .then((name) => console.log('Dev Tools Loaded'))
    //     .catch((err) => console.log(err));
    // }
});
//
// app.on('ready-to-show', () => {
//     createWindow();
// });

// Exiting the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Activating the app
// app.on('activate', () => {
//     if (mainWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// Logging any exceptions
process.on('uncaughtException', (error) => {
    console.log(`Exception: ${error}`);
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


