// Начальное значение баллов
let score = 0;

// Получаем элементы
const scoreElement = document.getElementById('score');
const button = document.getElementById('actionButton');

// Добавляем обработчик события клика
button.addEventListener('click', () => {
    // Увеличиваем количество баллов на 1 при каждом клике
    score += 1;
    
    // Обновляем отображение количества баллов
    scoreElement.textContent = score;
});
