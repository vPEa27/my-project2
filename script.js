// Инициализация Web App
const tg = window.Telegram.WebApp;

// Список ссылок на изображения для Сюжета №1
const imagesPlot1 = [
    "https://avatars.mds.yandex.net/i?id=c2bc7833f798c98dc32347e7e1f8da46ceffd2e1-9196574-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=2ae9b3fa60168135c60ea277e7a2aa179c57c769-9181437-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=e4ee40bba2d4dbc0448410365a744d3006d9deab723354e8-4591292-images-thumbs&n=13"
];

// Список названий и описаний изображений для Сюжета №1
const titlesPlot1 = [
    "Название изображения 1",
    "Название изображения 2",
    "Название изображения 3"
];

const descriptionsPlot1 = [
    "Это описание изображения 1.",
    "Это описание изображения 2.",
    "Это описание изображения 3."
];

// Список ссылок на изображения для Сюжета №2
const imagesPlot2 = [
    "https://avatars.mds.yandex.net/i?id=8f8d5e9a7ad633d442e1514689d859d4b6798f95-6946998-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=4cb8987d67b85f6474ddfcdb12920de42db327cf-4351964-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=3d0753291a9b143afba0496b3bf8bb3f093959f6-4234439-images-thumbs&n=13"
];

// Список названий и описаний изображений для Сюжета №2
const titlesPlot2 = [
    "Название изображения 1",
    "Название изображения 2",
    "Название изображения 3"
];

const descriptionsPlot2 = [
    "Это описание изображения 1.",
    "Это описание изображения 2.",
    "Это описание изображения 3."
];

// Получаем сохраненные данные из localStorage
const customImages = JSON.parse(localStorage.getItem('customImages')) || [];
const customTitles = JSON.parse(localStorage.getItem('customTitles')) || ["Название изображения 1", "Название изображения 2", "Название изображения 3"];
const customDescriptions = JSON.parse(localStorage.getItem('customDescriptions')) || ["Это описание изображения 1.", "Это описание изображения 2.", "Это описание изображения 3."];

let currentIndex = 0;
let currentPlot = 1; // Текущий выбранный сюжет (1, 2 или 3)

// Функция обновления изображения и текста с анимацией
function updateImage() {
    const photoElement = document.getElementById('photo');
    const titleElement = document.getElementById('photoTitle');
    const descriptionElement = document.getElementById('photoDescription');

    // Определяем, какой набор изображений использовать
    let images, titles, descriptions;
    if (currentPlot === 1) {
        images = imagesPlot1;
        titles = titlesPlot1;
        descriptions = descriptionsPlot1;
    } else if (currentPlot === 2) {
        images = imagesPlot2;
        titles = titlesPlot2;
        descriptions = descriptionsPlot2;
    } else {
        images = customImages;
        titles = customTitles;
        descriptions = customDescriptions;
    }

    // Проверяем, есть ли изображения в текущем наборе
    if (images.length === 0) {
        alert("Пожалуйста, добавьте ссылки на изображения для собственного сюжета.");
        return;
    }

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

// Функция сохранения пользовательских данных в localStorage
function saveCustomData() {
    localStorage.setItem('customImages', JSON.stringify(customImages));
    localStorage.setItem('customTitles', JSON.stringify(customTitles));
    localStorage.setItem('customDescriptions', JSON.stringify(customDescriptions));
}

// Обработчик кликов по изображению для перелистывания
document.getElementById('photo').addEventListener('click', (event) => {
    const photoElement = event.currentTarget;
    const photoWidth = photoElement.clientWidth;
    const clickX = event.offsetX;

    if (clickX < photoWidth / 2) {
        // Нажатие на левую половину - предыдущее изображение
        const images = currentPlot === 1 ? imagesPlot1 : (currentPlot === 2 ? imagesPlot2 : customImages);
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    } else {
        // Нажатие на правую половину - следующее изображение
        const images = currentPlot === 1 ? imagesPlot1 : (currentPlot === 2 ? imagesPlot2 : customImages);
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    }
    updateImage();
});

// Добавление обработчиков событий для кнопок "Сюжет №1" и "Сюжет №2"
document.getElementById('plot1Button').addEventListener('click', (event) => {
    event.stopPropagation();
    currentPlot = 1;
    currentIndex = 0;
    updateImage();
});

document.getElementById('plot2Button').addEventListener('click', (event) => {
    event.stopPropagation();
    currentPlot = 2;
    currentIndex = 0;
    updateImage();
});

// Добавление обработчика события для кнопки "Собственный сюжет"
document.getElementById('customPlotButton').addEventListener('click', (event) => {
    event.stopPropagation();
    document.getElementById('customPlotModal').style.display = 'block';
});

// Обработчик для закрытия модального окна
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('customPlotModal').style.display = 'none';
});

// Обработчик для сохранения пользовательских ссылок
document.getElementById('saveCustomPlot').addEventListener('click', () => {
    const link1 = document.getElementById('customLink1').value;
    const link2 = document.getElementById('customLink2').value;
    const link3 = document.getElementById('customLink3').value;

    // Сохраняем ссылки в массиве и в localStorage
    customImages.length = 0;
    if (link1) customImages.push(link1);
    if (link2) customImages.push(link2);
    if (link3) customImages.push(link3);

    saveCustomData();  // Сохранение в localStorage

    // Показываем кнопки "Редактор сюжета", если ссылки были добавлены
    document.getElementById('editPlotButton').style.display = customImages.length > 0 ? 'block' : 'none';

    currentPlot = 3;
    currentIndex = 0;

    document.getElementById('customPlotModal').style.display = 'none';
    updateImage();
});

// Добавление обработчика события для кнопки "Редактор сюжета"
document.getElementById('editPlotButton').addEventListener('click', (event) => {
    event.stopPropagation();
    document.getElementById('editPlotModal').style.display = 'block';

    // Предзаполнение полей ввода текущими названиями и описаниями
    document.getElementById('editTitle1').value = customTitles[0];
    document.getElementById('editDesc1').value = customDescriptions[0];
    document.getElementById('editTitle2').value = customTitles[1];
    document.getElementById('editDesc2').value = customDescriptions[1];
    document.getElementById('editTitle3').value = customTitles[2];
    document.getElementById('editDesc3').value = customDescriptions[2];
});

// Обработчик для закрытия модального окна редактора
document.getElementById('closeEditModal').addEventListener('click', () => {
    document.getElementById('editPlotModal').style.display = 'none';
});

// Обработчик для сохранения изменений в названиях и описаниях
document.getElementById('saveEditPlot').addEventListener('click', () => {
    // Сохраняем новые названия и описания
    customTitles[0] = document.getElementById('editTitle1').value;
    customDescriptions[0] = document.getElementById('editDesc1').value;
    customTitles[1] = document.getElementById('editTitle2').value;
    customDescriptions[1] = document.getElementById('editDesc2').value;
    customTitles[2] = document.getElementById('editTitle3').value;
    customDescriptions[2] = document.getElementById('editDesc3').value;

    saveCustomData();  // Сохранение в localStorage

    document.getElementById('editPlotModal').style.display = 'none';
    updateImage();
});

// Обработчик для кнопки "Сохранение"
document.getElementById('savePlotButton').addEventListener('click', () => {
    if (customImages.length === 0) {
        alert("Пожалуйста, добавьте ссылки на изображения для собственного сюжета.");
    } else {
        currentPlot = 3;
        currentIndex = 0;
        updateImage();
    }
});

// Логирование закрытия Web App и сохранение данных
tg.onEvent('web_app_close', () => {
    saveCustomData();
    console.log('Web App закрыт');
});

// Обновляем изображение и текст при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateImage();

    // Проверяем, нужно ли показывать кнопки "Редактор сюжета" и "Сохранение" при загрузке
    const showCustomButtons = customImages.length > 0;
    document.getElementById('editPlotButton').style.display = showCustomButtons ? 'block' : 'none';
});
