const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.value !== undefined) {
            display.value += button.dataset.value;
        }

        if (button.dataset.operator !== undefined) {
            display.value += button.dataset.operator;
        }

        if (button.classList.contains('equal')) {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = 'Ошибка';
            }
        }

        if (button.classList.contains('clear')) {
            display.value = '';
        }
    });
});
