// Инициализация Web App
const tg = window.Telegram.WebApp;

// Список ссылок на изображения
const images = [
    "https://avatars.mds.yandex.net/i?id=c2bc7833f798c98dc32347e7e1f8da46ceffd2e1-9196574-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=2ae9b3fa60168135c60ea277e7a2aa179c57c769-9181437-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=e4ee40bba2d4dbc0448410365a744d3006d9deab723354e8-4591292-images-thumbs&n=13"
];

let currentIndex = 0;

// Функция обновления изображения
function updateImage() {
    const photoElement = document.getElementById('photo');
    photoElement.src = images[currentIndex];
}

// Обработчики кнопок
document.getElementById('prevButton').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
    }
});

// Логирование закрытия Web App
tg.onEvent('web_app_close', () => {
    console.log('Web App закрыт');
});
