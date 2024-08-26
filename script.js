// Инициализация Web App
const tg = window.Telegram.WebApp;

// Список ссылок на изображения
const images = [
    "https://avatars.mds.yandex.net/i?id=c2bc7833f798c98dc32347e7e1f8da46ceffd2e1-9196574-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=2ae9b3fa60168135c60ea277e7a2aa179c57c769-9181437-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=e4ee40bba2d4dbc0448410365a744d3006d9deab723354e8-4591292-images-thumbs&n=13"
];

// Список названий и описаний изображений
const titles = [
    "Название изображения 1",
    "Название изображения 2",
    "Название изображения 3"
];

const descriptions = [
    "Это описание изображения 1.",
    "Это описание изображения 2.",
    "Это описание изображения 3."
];

let currentIndex = 0;

// Функция обновления изображения и текста с анимацией
function updateImage() {
    const photoElement = document.getElementById('photo');
    const titleElement = document.getElementById('photoTitle');
    const descriptionElement = document.getElementById('photoDescription');

    // Добавляем класс fade-out для плавного исчезновения
    photoElement.classList.add('fade-out');

    setTimeout(() => {
        // Обновляем изображение и текст после завершения анимации исчезновения
        photoElement.src = images[currentIndex];
        titleElement.textContent = titles[currentIndex];
        descriptionElement.textContent = descriptions[currentIndex];

        // Убираем класс fade-out для плавного появления
        photoElement.classList.remove('fade-out');
    }, 500); // Время должно совпадать с длительностью transition в CSS
}

// Обработчики кнопок
document.getElementById('prevButton').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1; // Циклическая навигация
    updateImage();
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0; // Циклическая навигация
    updateImage();
});

// Логирование закрытия Web App
tg.onEvent('web_app_close', () => {
    console.log('Web App закрыт');
});

// Обновляем изображение и текст при загрузке
document.addEventListener('DOMContentLoaded', updateImage);
