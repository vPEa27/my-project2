let currentPanel = 0;
const panels = document.querySelectorAll('.comic-panel');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

function showPanel(index) {
    panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === index);
    });
}

nextButton.addEventListener('click', () => {
    currentPanel = (currentPanel + 1) % panels.length;
    showPanel(currentPanel);
});

prevButton.addEventListener('click', () => {
    currentPanel = (currentPanel - 1 + panels.length) % panels.length;
    showPanel(currentPanel);
});

// Изначально показываем первый кадр
showPanel(currentPanel);
