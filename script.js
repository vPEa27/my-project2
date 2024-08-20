let balance = 0;

document.getElementById('score-button').addEventListener('click', function() {
    balance++;
    document.getElementById('balance').textContent = balance;
});
