let balance = parseFloat(localStorage.getItem('balance')) || 0.000; // Восстанавливаем баланс из локального хранилища или устанавливаем начальный баланс
let isMining = false;
let progress = 0;
let dailyLoginStreak = parseInt(localStorage.getItem('dailyLoginStreak')) || 0; // Восстанавливаем серию ежедневных входов
let lastLoginDate = localStorage.getItem('lastLoginDate') || null; // Восстанавливаем дату последнего входа
const progressBar = document.getElementById('progress-bar');
const balanceDisplay = document.getElementById('balance');
const collectButton = document.getElementById('collectButton');
const upgradeButton = document.getElementById('upgradeButton'); // Кнопка для перехода на страницу улучшений
const friendsButton = document.getElementById('friendsButton'); // Кнопка для перехода на страницу друзей
const tasksButton = document.getElementById('tasksButton'); // Кнопка для перехода на страницу заданий
const backButtonFromUpgrades = document.getElementById('backButtonFromUpgrades'); // Кнопка для возврата на главную страницу с улучшений
const backButtonFromFriends = document.getElementById('backButtonFromFriends'); // Кнопка для возврата на главную страницу с друзей
const backButtonFromTasks = document.getElementById('backButtonFromTasks'); // Кнопка для возврата на главную страницу с заданий
const copyLinkButton = document.getElementById('copyLinkButton'); // Кнопка "Скопировать ссылку"
const dailyLoginButton = document.getElementById('dailyLoginButton'); // Кнопка "Ежедневный вход"
const collectRewardButton = document.getElementById('collectRewardButton'); // Кнопка "Собрать награду"
const rewardsSection = document.getElementById('rewards-section'); // Секция наград
const rewardsList = document.getElementById('rewardsList');
const timerDisplay = document.getElementById('timer');
const referralLinkInput = document.getElementById('referralLink');
const friendsList = document.getElementById('friendsList');

const botUsername = 'chtotytpisattablinbot'; // Имя вашего бота
const miningDuration = 60; // Длительность майнинга в секундах (1 час)
const miningIncrement = 100 / miningDuration; // Шаг прогресса
let remainingTime = miningDuration; // Оставшееся время в секундах

// Инициализация приложения
function initializeApp() {
    // Восстанавливаем баланс
    balanceDisplay.innerText = balance.toFixed(3);

    // Восстанавливаем список друзей
    updateFriendsList();

    // Проверяем реферальную ссылку
    checkReferral();

    // Проверяем ежедневный вход
    checkDailyLogin();
}

// Инициализация реферальной ссылки
function initializeReferralLink() {
    const referralLink = `https://t.me/${botUsername}?start=${generateUserId()}`;
    referralLinkInput.value = referralLink;
}

// Генерация уникального идентификатора пользователя (можно использовать любой способ генерации)
function generateUserId() {
    return Math.random().toString(36).substring(2, 15);
}

// Проверка URL на наличие реферального параметра
function checkReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('start');
    if (referrerId) {
        addFriend(referrerId);
    }
}

// Проверка ежедневного входа
function checkDailyLogin() {
    const today = new Date().toISOString().split('T')[0]; // Получаем сегодняшнюю дату в формате YYYY-MM-DD

    if (lastLoginDate !== today) {
        if (lastLoginDate === null || new Date(today) - new Date(lastLoginDate) > 86400000) {
            // Сбрасываем серию входов, если пользователь пропустил день
            dailyLoginStreak = 0;
        }

        lastLoginDate = today;
        localStorage.setItem('lastLoginDate', lastLoginDate);
        updateRewards();
    }
}

// Обновление наград за ежедневный вход
function updateRewards() {
    dailyLoginStreak += 1;
    localStorage.setItem('dailyLoginStreak', dailyLoginStreak);

    rewardsList.innerHTML = '';
    for (let i = 1; i <= dailyLoginStreak; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `День ${i}: ${i * 0.001} Луна Коинов`;
        rewardsList.appendChild(listItem);
    }

    rewardsSection.style.display = 'block';
}

// Добавление друга в локальное хранилище
function addFriend(friendId) {
    let friends = JSON.parse(localStorage.getItem('friends')) || [];
    if (!friends.includes(friendId)) {
        friends.push(friendId);
        localStorage.setItem('friends', JSON.stringify(friends));
        updateFriendsList();
    }
}

// Обновление списка друзей на странице
function updateFriendsList() {
    let friends = JSON.parse(localStorage.getItem('friends')) || [];
    friendsList.innerHTML = '';
    friends.forEach(friendId => {
        const listItem = document.createElement('li');
        listItem.textContent = `Друг: ${friendId}`;
        friendsList.appendChild(listItem);
    });
}

// Сохранение баланса в локальное хранилище
function saveBalance() {
    localStorage.setItem('balance', balance.toFixed(3));
}

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
                saveBalance(); // Сохраняем баланс
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Сброс таймера
function resetTimer() {
    remainingTime = miningDuration;
    updateTimerDisplay(remainingTime);
}

// Добавляем обработчик событий на кнопку "Собрать Луна монеты"
collectButton.addEventListener('click', () => {
    startMining();
});

// Функции для перехода между страницами
function showPage(pageId) {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('upgrade-page').style.display = 'none';
    document.getElementById('friends-page').style.display = 'none';
    document.getElementById('tasks-page').style.display = 'none';

    document.getElementById(pageId).style.display = 'block';
}

// Добавляем обработчик событий на кнопку "Улучшение"
upgradeButton.addEventListener('click', function() {
    showPage('upgrade-page'); // Переход на страницу улучшений
});

// Добавляем обработчик событий на кнопку "Друзья"
friendsButton.addEventListener('click', function() {
    showPage('friends-page'); // Переход на страницу друзей
    initializeReferralLink(); // Инициализация реферальной ссылки
    updateFriendsList(); // Обновление списка друзей
});

// Добавляем обработчик событий на кнопку "Задания"
tasksButton.addEventListener('click', function() {
    showPage('tasks-page'); // Переход на страницу заданий
});

// Добавляем обработчик событий на кнопку "Назад" со страницы улучшений
backButtonFromUpgrades.addEventListener('click', function() {
    showPage('main-page'); // Переход на главную страницу
});

// Добавляем обработчик событий на кнопку "Назад" со страницы друзей
backButtonFromFriends.addEventListener('click', function() {
    showPage('main-page'); // Переход на главную страницу
});

// Добавляем обработчик событий на кнопку "Назад" со страницы заданий
backButtonFromTasks.addEventListener('click', function() {
    showPage('main-page'); // Переход на главную страницу
});

// Добавляем обработчик событий на кнопку "Скопировать ссылку"
copyLinkButton.addEventListener('click', function() {
    const referralLink = referralLinkInput.value;
    
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Ссылка скопирована в буфер обмена');
    }).catch((err) => {
        console.error('Ошибка при копировании ссылки: ', err);
    });
});

// Добавляем обработчик событий на кнопку "Ежедневный вход"
dailyLoginButton.addEventListener('click', function() {
    updateRewards();
});

// Добавляем обработчик событий на кнопку "Собрать награду"
collectRewardButton.addEventListener('click', function() {
    const reward = dailyLoginStreak * 0.001; // Рассчитываем награду
    balance += reward; // Добавляем награду к балансу
    saveBalance(); // Сохраняем баланс
    balanceDisplay.innerText = balance.toFixed(3); // Обновляем отображение баланса

    alert(`Вы собрали ${reward.toFixed(3)} Луна Коинов!`);
    rewardsSection.style.display = 'none'; // Скрываем секцию наград
});

// Инициализируем приложение при загрузке
initializeApp();
