/* eslint-disable */
const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");

const express = require("express");
const server = express();

const port = process.env.PORT ? process.env.PORT - 200 : 8080;

const createServer = () => {
  server.use(express.static(path.join(__dirname, "../build")));
  server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
  server.listen(port);
};

let mainWindow;

const createWindow = () => {
  if (!process.env.ELECTRON_START_URL) {
    createServer();
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(process.env.ELECTRON_START_URL || `http://localhost:${port}`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
