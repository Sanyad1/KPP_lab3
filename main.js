const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// Зберігаємо глобальне посилання на об'єкт Window, якщо цього не зробити, то
// вікно закриється автоматично, коли спрацює збиральник мусору JS.
var mainWindow = null;

// Вийти після того, як всі вікна будуть закриті
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Цей метод буде визваний, коли Electron закінчить
// ініціалізацію і готовий до створення вікна браузера.
app.on('ready', function() {
    // Створюємо вікно браузера браузера.
    mainWindow = new BrowserWindow({width: 900, height: 600});

    // і завантажуємо index.html в аплікацію.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Генерується, коли вікно закрито.
    mainWindow.on('closed', function() {
        // Скидання об'єкта вікна, зазвичай потрібен, коли вікна зберігаються
        // в масиві, це потрібно, якщо в аплікації багато вікон,
        // в такому випадку потрібно видалити відповідний елемент.
        mainWindow = null;
    });
});
