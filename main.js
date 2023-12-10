const { create } = require('domain')
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 윈도우 창 설정, 너비 높이 어떤 파일 불러올건지
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// 일렉트론의 경우 app 모듈이 ready 이벤트 발생시에 시작함
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 종료시 처리
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})