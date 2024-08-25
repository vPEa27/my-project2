// Инициализация Web App
const tg = window.Telegram.WebApp;

tg.expand(); // Развернуть Web App на весь экран

// Вывести приветственное сообщение
document.getElementById('greeting').innerText = `Привет, ${tg.initDataUnsafe.user.first_name}!`;

// Обработчик для изменения текста по кнопке
document.getElementById('changeText').addEventListener('click', () => {
    document.getElementById('greeting').innerText = 'Вы изменили текст!';
});

// Логирование закрытия Web App
tg.onEvent('web_app_close', () => {
    console.log('Web App закрыт');
});
