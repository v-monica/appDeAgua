const cupBtns = document.querySelectorAll('.cup-btn');
const fill = document.getElementById('fill');
const litersRemaining = document.getElementById('liters-remaining');
const remaining = document.getElementById('remaining');
const bottle = document.getElementById('bottle');

const goal = 2000;
const amountPerCup = 250;

cupBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => highlightCups(idx));
});

bottle.addEventListener('click', () => {
    const activeCups = document.querySelectorAll('.cup-btn.activo').length;
    if ((activeCups * amountPerCup / goal) * 100 === 100) {
        resetApp();
    }
});

function highlightCups(idx) {
    if (cupBtns[idx].classList.contains('activo') && (idx === cupBtns.length - 1 || !cupBtns[idx + 1].classList.contains('activo'))) {
        idx--;
    }

    cupBtns.forEach((btn, idx2) => {
        if (idx2 <= idx) {
            btn.classList.add('activo');
        } else {
            btn.classList.remove('activo');
        }
    });

    updateBottle();
}

function updateBottle() {
    const activeCups = document.querySelectorAll('.cup-btn.activo').length;
    const waterDrank = activeCups * amountPerCup;
    const percentageValue = (waterDrank / goal) * 100;

    if (activeCups === 0) {
        fill.style.height = '0';
        fill.style.visibility = 'hidden';
        fill.textContent = '';
    } else {
        fill.style.visibility = 'visible';
        fill.style.height = `${percentageValue}%`;
        fill.textContent = `${percentageValue}%`;
    }

    litersRemaining.textContent = (goal - waterDrank) / 1000;


    if (percentageValue === 100) {
        remaining.style.visibility = 'hidden';
        remaining.style.height = '0%';
        bottle.style.cursor = 'pointer';
    } else {
        remaining.style.visibility = 'visible';
        remaining.style.height = `${100 - percentageValue}%`;
        bottle.style.cursor = 'default';
    }

}

function resetApp() {
    cupBtns.forEach(btn => btn.classList.remove('activo'));
    updateBottle();
}