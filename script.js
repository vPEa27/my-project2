let balance = 0;

document.getElementById('score-button').addEventListener('click', function() {
    balance++;
    document.getElementById('balance').textContent = balance;
});

// Обработка кликов по экрану
document.body.addEventListener('click', function(event) {
    if (!event.target.closest('#score-button')) { // Если клик не по кнопке
        createParticles(event.clientX, event.clientY);
    }
});

function createParticles(x, y) {
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 20 + 10;
        const xOffset = Math.cos(angle) * radius;
        const yOffset = Math.sin(angle) * radius;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--x', `${xOffset}px`);
        particle.style.setProperty('--y', `${yOffset}px`);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}
