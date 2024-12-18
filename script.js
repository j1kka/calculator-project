// Получаем элементы дисплея и все кнопки
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Основная логика для базовых операций 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Обработка чисел
        if (button.dataset.value !== undefined) {
            display.value += button.dataset.value;
        }

        // Обработка операторов
        if (button.dataset.operator !== undefined) {
            display.value += button.dataset.operator;
        }

        // Кнопка равенства "="
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

        // Кнопка очистки "C"
        if (button.classList.contains('clear')) {
            display.value = '';
        }
    });
});

// Поддержка ввода с клавиатуры (Medium уровень)
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
                if (display.value.includes('/0')) {
                    display.value = 'Division by zero is not allowed!';
                    return;
                }
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

// Добавляем кнопку для переключения научного режима 
const scientificButton = document.createElement('button');
scientificButton.textContent = 'Scientific toggle';
scientificButton.classList.add('scientific-toggle');
document.querySelector('.buttons').appendChild(scientificButton);

let isScientificMode = false;

// Переключатель научного режима
scientificButton.addEventListener('click', () => {
    isScientificMode = !isScientificMode; // Переключаем состояние (включен/выключен)
    
    const scientificButtons = document.querySelectorAll('.scientific');
    scientificButtons.forEach(btn => {
        btn.style.display = isScientificMode ? 'block' : 'none';
    });
});

// Создаем научные функции (Hard уровень)
const scientificFunctions = [
    { text: '√', func: 'Math.sqrt' }, // Квадратный корень
    { text: '%', func: '/100' }, // Процент
    { text: 'sin', func: 'Math.sin' }, // Синус
    { text: 'cos', func: 'Math.cos' }, // Косинус
    { text: 'tan', func: 'Math.tan' } // Тангенс
];

// Динамическое создание научных кнопок и добавление их функциональности
scientificFunctions.forEach(func => {
    const button = document.createElement('button');
    button.textContent = func.text; // Устанавливаем текст на кнопке (√, %, sin, cos, tan)
    button.classList.add('scientific'); // Класс для стиля научной кнопки
    button.style.display = 'none'; // Научные кнопки скрыты по умолчанию
    
    button.addEventListener('click', () => {
        const currentValue = parseFloat(display.value);

        if (isNaN(currentValue)) {
            display.value = 'Error';
            return;
        }

        if (func.func === '/100') {
            display.value = currentValue / 100; // Процентное деление
        } else if (func.func === 'Math.sqrt') {
            if (currentValue < 0) {
                display.value = 'Invalid input'; // Квадратный корень из отрицательного числа
            } else {
                display.value = Math.sqrt(currentValue); // Квадратный корень
            }
} else if (func.func === 'Math.sin') {
            display.value = Math.sin(currentValue); // Синус
        } else if (func.func === 'Math.cos') {
            display.value = Math.cos(currentValue); // Косинус
        } else if (func.func === 'Math.tan') {
            display.value = Math.tan(currentValue); // Тангенс
        }
    });

    document.querySelector('.buttons').appendChild(button); // Добавляем кнопку на страницу
});
