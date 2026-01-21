import { app, BrowserWindow, ipcMain } from "electron";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import path from "path";
import { getPreloadPath, getUIPAth } from "./pathResolver.js";

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
	});

	if (isDev()) {
		mainWindow.loadURL("http://localhost:5123");
	} else {
		mainWindow.loadFile(getUIPAth());
	}

	pollResources(mainWindow);

	ipcHandle("getStaticData", () => {
		return getStaticData();
	});
});
