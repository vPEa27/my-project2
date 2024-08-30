let balance = 0.000; // Начальный баланс равен нулю
let isMining = false;
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const balanceDisplay = document.getElementById('balance');
const collectButton = document.getElementById('collectButton');
const timerDisplay = document.getElementById('timer');

const miningDuration = 60; // Длительность майнинга в секундах (1 час)
const miningIncrement = 100 / miningDuration; // Шаг прогресса
let remainingTime = miningDuration; // Оставшееся время в секундах

// Функция для обновления прогресса
function startMining() {
    if (!isMining) {
        isMining = true;
        progress = 0;
        const miningInterval = setInterval(() => {
            progress += miningIncrement; // Увеличиваем прогресс
            updateProgressBar(progress);

            // Обновляем таймер
            remainingTime--;
            updateTimerDisplay(remainingTime);

            if (progress >= 100) {
                clearInterval(miningInterval);
                balance += 0.001; // Добавляем 0.001 монеты Луна за полный цикл майнинга
                balanceDisplay.innerText = balance.toFixed(3); // Обновляем отображение баланса
                isMining = false;
                resetTimer();
            }
        }, 1000); // Обновляем каждую секунду (1000 миллисекунд)
    }
}

// Функция для обновления прогресс-бара
function updateProgressBar(progress) {
    progressBar.style.width = `${progress}%`;
}

// Функция для обновления отображения таймера
function updateTimerDisplay(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    timerDisplay.innerText = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Сброс таймера
function resetTimer() {
    remainingTime = miningDuration;
    updateTimerDisplay(remainingTime);
}

// Добавляем обработчик событий на кнопку
collectButton.addEventListener('click', () => {
    startMining();
});
