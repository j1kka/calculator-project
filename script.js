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
                display.value = 'Error';
            }
        }

        if (button.classList.contains('clear')) {
            display.value = '';
        }

        // Кнопка равенства с расширенной обработкой
if (button.classList.contains('equal')) {
    try {
        // Проверка на деление на ноль
        if (display.value.includes('/0')) {
            display.value = 'Division by zero is not allowed!';
            return;
        }
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

// Поддержка клавиатуры
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const validKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        '+', '-', '*', '/', 'Enter', 'Backspace'
    ];

    if (validKeys.includes(key)) {
        event.preventDefault();
        
        if (key === 'Enter') {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = 'Error';
            }
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else {
            display.value += key;
        }
    }
}); 
    });
});
