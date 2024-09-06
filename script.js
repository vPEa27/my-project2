let balance = parseFloat(localStorage.getItem('balance')) || 0.000;
let isMining = false;
let progress = 0;
let dailyLoginStreak = parseInt(localStorage.getItem('dailyLoginStreak')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || null;
let lastRewardTime = parseInt(localStorage.getItem('lastRewardTime')) || 0;

const progressBar = document.getElementById('progress-bar');
const balanceDisplay = document.getElementById('balance');
const collectButton = document.getElementById('collectButton');
const upgradeButton = document.getElementById('upgradeButton');
const friendsButton = document.getElementById('friendsButton');
const tasksButton = document.getElementById('tasksButton');
const backButtonFromUpgrades = document.getElementById('backButtonFromUpgrades');
const backButtonFromFriends = document.getElementById('backButtonFromFriends');
const backButtonFromTasks = document.getElementById('backButtonFromTasks');
const copyLinkButton = document.getElementById('copyLinkButton');
const dailyLoginButton = document.getElementById('dailyLoginButton');
const collectRewardButton = document.getElementById('collectRewardButton');
const rewardsSection = document.getElementById('rewards-section');
const rewardsList = document.getElementById('rewardsList');
const timerDisplay = document.getElementById('timer');
const referralLinkInput = document.getElementById('referralLink');
const friendsList = document.getElementById('friendsList');
const dailyRewardModal = document.getElementById('dailyRewardModal');
const closeModal = document.getElementById('closeModal');

const miningDuration = 60;
const miningIncrement = 100 / miningDuration;
let remainingTime = miningDuration;
const rewardsInterval = 86400000; // 24 часа в миллисекундах

// Убеждаемся, что модальное окно скрыто при загрузке
dailyRewardModal.style.display = 'none';

function initializeApp() {
    balanceDisplay.innerText = balance.toFixed(3);
    updateFriendsList();
    checkReferral();
    checkDailyLogin();
    console.log("Приложение инициализировано");
}

function initializeReferralLink() {
    const referralLink = `https://t.me/chtotytpisattablinbot?start=5em0ga27b94`;
    referralLinkInput.value = referralLink;
}

function generateUserId() {
    return Math.random().toString(36).substring(2, 15);
}

function checkReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('start');
    if (referrerId) {
        addFriend(referrerId);
    }
}

function checkDailyLogin() {
    const today = new Date().toISOString().split('T')[0];
    if (lastLoginDate !== today) {
        if (lastLoginDate === null || new Date(today) - new Date(lastLoginDate) > 86400000) {
            dailyLoginStreak = 0;
        }
        lastLoginDate = today;
        localStorage.setItem('lastLoginDate', lastLoginDate);
        updateRewards();
    }
}

function updateRewards() {
    dailyLoginStreak += 1;
    localStorage.setItem('dailyLoginStreak', dailyLoginStreak);

    rewardsList.innerHTML = '';
    for (let i = 1; i <= 15; i++) {  // Отображаем награды только за первые 15 дней
        const listItem = document.createElement('li');
        listItem.textContent = `День ${i}: ${(i * 0.001).toFixed(3)} Луна Коинов`;

        // Подсвечиваем текущий день
        if (i === dailyLoginStreak) {
            listItem.classList.add('current-day');
        }

        rewardsList.appendChild(listItem);
    }
}


function addFriend(friendId) {
    let friends = JSON.parse(localStorage.getItem('friends')) || [];
    if (!friends.includes(friendId)) {
        friends.push(friendId);
        localStorage.setItem('friends', JSON.stringify(friends));
        updateFriendsList();
    }
}

function updateFriendsList() {
    let friends = JSON.parse(localStorage.getItem('friends')) || [];
    friendsList.innerHTML = '';
    friends.forEach(friendId => {
        const listItem = document.createElement('li');
        listItem.textContent = `Друг: ${friendId}`;
        friendsList.appendChild(listItem);
    });
}

function saveBalance() {
    localStorage.setItem('balance', balance.toFixed(3));
}

// Исправленная функция для майнинга
function startMining() {
    if (!isMining) {
        console.log("Майнинг начался");
        isMining = true;
        progress = 0;
        remainingTime = miningDuration;
        const miningInterval = setInterval(() => {
            progress += miningIncrement;
            updateProgressBar(progress);

            remainingTime--;
            updateTimerDisplay(remainingTime);

            if (progress >= 100) {
                clearInterval(miningInterval);
                balance += 0.001;
                saveBalance();
                balanceDisplay.innerText = balance.toFixed(3);
                isMining = false;
                resetTimer();
                console.log("Майнинг завершен, баланс обновлен");
            }
        }, 1000);
    } else {
        console.log("Майнинг уже запущен");
    }
}

function updateProgressBar(progress) {
    progressBar.style.width = `${progress}%`;
}

function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function resetTimer() {
    remainingTime = miningDuration;
    updateTimerDisplay(remainingTime);
}

// Добавление обработчика на кнопку майнинга
collectButton.addEventListener('click', function() {
    console.log("Кнопка нажата");
    startMining();
});

// Открытие модального окна при нажатии на задание "Ежедневный вход"
dailyLoginButton.addEventListener('click', function () {
    updateRewards();
    dailyRewardModal.style.display = 'block';
});

// Закрытие модального окна
closeModal.addEventListener('click', function () {
    dailyRewardModal.style.display = 'none';
});

// Закрытие модального окна при нажатии за его пределами
window.addEventListener('click', function (event) {
    if (event.target === dailyRewardModal) {
        dailyRewardModal.style.display = 'none';
    }
});

// Получение награды
collectRewardButton.addEventListener('click', function () {
    const now = Date.now();
    if (now - lastRewardTime >= rewardsInterval) {
        const reward = dailyLoginStreak * 0.001;
        balance += reward;
        balanceDisplay.innerText = balance.toFixed(3);
        localStorage.setItem('balance', balance.toFixed(3));
        lastRewardTime = now;
        localStorage.setItem('lastRewardTime', lastRewardTime);
        alert(`Вы получили ${reward.toFixed(3)} Луна Коинов!`);
        dailyRewardModal.style.display = 'none';
    } else {
        alert('Награду можно забирать только каждые 24 часа.');
    }
});

function showPage(pageId) {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('upgrade-page').style.display = 'none';
    document.getElementById('friends-page').style.display = 'none';
    document.getElementById('tasks-page').style.display = 'none';

    document.getElementById(pageId).style.display = 'block';
}

upgradeButton.addEventListener('click', function () {
    showPage('upgrade-page');
});

friendsButton.addEventListener('click', function () {
    showPage('friends-page');
    initializeReferralLink();
    updateFriendsList();
});

tasksButton.addEventListener('click', function () {
    showPage('tasks-page');
});

backButtonFromUpgrades.addEventListener('click', function () {
    showPage('main-page');
});

backButtonFromFriends.addEventListener('click', function () {
    showPage('main-page');
});

backButtonFromTasks.addEventListener('click', function () {
    showPage('main-page');
});

copyLinkButton.addEventListener('click', function () {
    const referralLink = referralLinkInput.value;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Ссылка скопирована в буфер обмена');
    }).catch((err) => {
        console.error('Ошибка при копировании ссылки: ', err);
    });
});

// Инициализация приложения
initializeApp();
