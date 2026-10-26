// Ethnobotany для компьютера: то же веб-приложение из ../www в окне Electron.
// Файлы отдаются по своей схеме app://, чтобы у приложения был постоянный адрес (localStorage, прогресс и заметки сохраняются между запусками).
const { app, BrowserWindow, Menu, protocol, net, shell, screen } = require("electron");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const WWW = process.env.ETHNOBOTANY_WWW || (app.isPackaged ? path.join(process.resourcesPath, "www") : path.join(__dirname, "..", "www"));
const HOST = "app://ethnobotany";

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true, codeCache: true } },
]);

if (!app.requestSingleInstanceLock()) app.quit();

// Размер и положение окна запоминаются между запусками
const stateFile = () => path.join(app.getPath("userData"), "window.json");
function loadBounds() {
  try {
    const b = JSON.parse(fs.readFileSync(stateFile(), "utf8"));
    const area = screen.getDisplayMatching(b).workArea;
    if (b.x + 100 > area.x + area.width || b.y + 50 > area.y + area.height || b.x + b.width < area.x + 100 || b.y < area.y - 20) delete b.x, delete b.y;
    return b;
  } catch { return { width: 1280, height: 820 }; }
}
function saveBounds(win) {
  try { fs.writeFileSync(stateFile(), JSON.stringify({ ...win.getNormalBounds(), maximized: win.isMaximized() })); } catch {}
}

let win = null;
function createWindow() {
  const b = loadBounds();
  win = new BrowserWindow({
    ...b, minWidth: 380, minHeight: 500, show: false,
    title: "Ethnobotany", backgroundColor: "#17120d", autoHideMenuBar: true,
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: { contextIsolation: true, sandbox: true, spellcheck: false },
  });
  if (b.maximized) win.maximize();
  win.once("ready-to-show", () => win.show());
  ["resize", "move", "close"].forEach((ev) => win.on(ev, () => saveBounds(win)));

  // Внешние ссылки (источники, iNaturalist, DOI) открываются в браузере
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith(HOST)) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });

  // Назад и вперёд: Alt+←/→, ⌘[ ⌘], боковые кнопки мыши
  const nav = win.webContents.navigationHistory;
  win.webContents.on("before-input-event", (e, i) => {
    if (i.type !== "keyDown") return;
    const back = (i.alt && i.key === "ArrowLeft") || (i.meta && i.key === "[") || i.key === "BrowserBack";
    const fwd = (i.alt && i.key === "ArrowRight") || (i.meta && i.key === "]") || i.key === "BrowserForward";
    if (back && nav.canGoBack()) { e.preventDefault(); nav.goBack(); }
    if (fwd && nav.canGoForward()) { e.preventDefault(); nav.goForward(); }
  });
  win.on("app-command", (e, cmd) => {
    if (cmd === "browser-backward" && nav.canGoBack()) nav.goBack();
    if (cmd === "browser-forward" && nav.canGoForward()) nav.goForward();
  });

  win.loadURL(`${HOST}/index.html`);
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  protocol.handle("app", (req) => {
    const { pathname } = new URL(req.url);
    const file = path.normalize(path.join(WWW, decodeURIComponent(pathname)));
    if (!file.startsWith(WWW)) return new Response("Forbidden", { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
  });

  // Меню: на macOS обычное (правка, вид, окно), в Windows и Linux скрыто, но сочетания клавиш работают (Alt показывает его)
  const isMac = process.platform === "darwin";
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    ...(isMac ? [{ role: "appMenu" }] : []),
    { label: "Edit", submenu: [{ role: "undo" }, { role: "redo" }, { type: "separator" }, { role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "selectAll" }] },
    { label: "View", submenu: [
      { label: "Back", accelerator: isMac ? "Cmd+[" : "Alt+Left", click: () => win?.webContents.navigationHistory.canGoBack() && win.webContents.navigationHistory.goBack() },
      { label: "Home", accelerator: "CmdOrCtrl+Shift+H", click: () => win?.loadURL(`${HOST}/index.html#/`) },
      { type: "separator" },
      { role: "reload" }, { role: "resetZoom" }, { role: "zoomIn" }, { role: "zoomIn", accelerator: "CmdOrCtrl+=", visible: false }, { role: "zoomOut" },
      { type: "separator" }, { role: "togglefullscreen" },
      ...(app.isPackaged ? [] : [{ role: "toggleDevTools" }]),
    ] },
    { role: "windowMenu" },
  ]));

  createWindow();
  app.on("activate", () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
