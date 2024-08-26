<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MinApp for Telegram</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Кнопки "Собственный сюжет", "Редактор сюжета" и "Сохранение" в левом верхнем углу -->
    <div class="custom-plot-container">
        <button class="plot-button" id="customPlotButton">Собственный сюжет</button>
        <button class="plot-button" id="editPlotButton" style="display: none;">Редактор сюжета</button>
        <button class="plot-button" id="savePlotButton" style="display: none;">Сохранение</button>
    </div>

    <!-- Контейнер для кнопок смены сюжета -->
    <div class="buttons-container">
        <button class="plot-button" id="plot1Button">Сюжет №1</button>
        <button class="plot-button" id="plot2Button">Сюжет №2</button>
    </div>

    <div class="photo-container">
        <!-- Место для вставки изображения -->
        <img id="photo" src="https://avatars.mds.yandex.net/i?id=c2bc7833f798c98dc32347e7e1f8da46ceffd2e1-9196574-images-thumbs&n=13" alt="Фото" class="photo">
        
        <!-- Диалоговое окно с названием и описанием изображения -->
        <div class="caption">
            <h2 id="photoTitle">Название изображения 1</h2>
            <p id="photoDescription">Это описание изображения 1.</p>
        </div>
    </div>

    <!-- Модальное окно для ввода ссылок -->
    <div id="customPlotModal" class="modal">
        <div class="modal-content">
            <span class="close-button" id="closeModal">&times;</span>
            <h2>Введите ссылки на фотографии</h2>
            <input type="text" id="customLink1" placeholder="Ссылка на фотографию 1">
            <input type="text" id="customLink2" placeholder="Ссылка на фотографию 2">
            <input type="text" id="customLink3" placeholder="Ссылка на фотографию 3">
            <button class="plot-button" id="saveCustomPlot">Сохранить</button>
        </div>
    </div>

    <!-- Модальное окно для редактирования названий и описаний -->
    <div id="editPlotModal" class="modal">
        <div class="modal-content">
            <span class="close-button" id="closeEditModal">&times;</span>
            <h2>Редактировать названия и описания</h2>
            <div class="edit-section">
                <h3>Фотография 1</h3>
                <input type="text" id="editTitle1" placeholder="Название изображения 1">
                <input type="text" id="editDesc1" placeholder="Описание изображения 1">
            </div>
            <div class="edit-section">
                <h3>Фотография 2</h3>
                <input type="text" id="editTitle2" placeholder="Название изображения 2">
                <input type="text" id="editDesc2" placeholder="Описание изображения 2">
            </div>
            <div class="edit-section">
                <h3>Фотография 3</h3>
                <input type="text" id="editTitle3" placeholder="Название изображения 3">
                <input type="text" id="editDesc3" placeholder="Описание изображения 3">
            </div>
            <button class="plot-button" id="saveEditPlot">Сохранить изменения</button>
        </div>
    </div>

    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="script.js"></script>
</body>
</html>
