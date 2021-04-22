const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let browserWindow;

function createBrowserWindow() {
  browserWindow = new BrowserWindow({ width: 1040, height: 500, transparent: true, frame: false, resizable: false });

  browserWindow.loadURL(
    url.format({
      // тут нужно уточнить, что путь к файлу index.html будет валиден для
      // Angular 6+ приложения. Если у вас версия ниже, то используйте
      // следующий путь - /dist/index.html
      pathname: path.join(__dirname, '/dist/planner/index.html'),
      protocol: "file:",
      slashes: true
    })
  );

  browserWindow.on("closed", () => {
    browserWindow = null;
  });
}

app.on("ready", createBrowserWindow);

app.on("activate", () => {
  if (browserWindow === null) {
    createBrowserWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
