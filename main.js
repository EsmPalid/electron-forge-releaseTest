import { app, BrowserWindow, ipcMain } from "electron";
import path, { dirname } from "node:path";

const __dirname = dirname(new URL(import.meta.url).pathname);

console.log(__dirname);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
};

app.whenReady().then(() => {
    ipcMain.handle("ping", () => "pong");
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
