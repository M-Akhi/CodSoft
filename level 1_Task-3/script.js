document.addEventListener('DOMContentLoaded', () => {
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    const display = document.getElementById('display');

    function updateDisplay() {
        // Check if there is an operation to show it with the previous input
        if (operation !== null && currentInput === '') {
            display.textContent = `${previousInput} ${operation} `;
        } else {
            display.textContent = `${previousInput} ${operation ? operation : ''} ${currentInput}`;
        }
    }

    document.querySelectorAll('.digit, .operation').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('operation')) {
                if (currentInput !== '') {
                    if (previousInput !== '' && operation !== null) {
                        // Perform calculation if an operation was already set
                        currentInput = String(evaluate(previousInput, currentInput, operation));
                        previousInput = '';
                    } else {
                        // Prepare for a new operation
                        previousInput = currentInput;
                        currentInput = '';
                    }
                }
                operation = this.value;
            } else {
                currentInput += this.value;
            }
            updateDisplay();
        });
    });

    document.querySelector('.equals').addEventListener('click', () => {
        if (previousInput && currentInput && operation) {
            currentInput = String(evaluate(previousInput, currentInput, operation));
            // After calculation, reset operation but keep currentInput for display
            operation = null;
            previousInput = '';
            display.textContent = currentInput;
        }
    });

    document.querySelector('.clear').addEventListener('click', () => {
        currentInput = '';
        previousInput = '';
        operation = null;
        display.textContent = '0';
    });

    function evaluate(previous, current, operation) {
        previous = parseFloat(previous);
        current = parseFloat(current);

        if (isNaN(previous) || isNaN(current)) return '';

        switch (operation) {
            case '+':
                return previous + current;
            case '-':
                return previous - current;
            case '*':
                return previous * current;
            case '/':
                if (current === 0) return 'Error';
                return previous / current;
            default:
                return '';
        }
    }
});
