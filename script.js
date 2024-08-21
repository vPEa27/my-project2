let currentPanel = 0;
const panels = document.querySelectorAll('.comic-panel');
const nextButton = document.getElementById('next-button');

function showPanel(index) {
    panels.forEach((panel, i) => {
        panel.style.display = i === index ? 'block' : 'none';
    });
}

nextButton.addEventListener('click', () => {
    currentPanel++;
    if (currentPanel >= panels.length) {
        currentPanel = 0;
    }
    showPanel(currentPanel);
});

// Изначально показываем первый кадр
showPanel(currentPanel);

