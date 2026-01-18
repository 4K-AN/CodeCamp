// Evaluates mathematical expression with order of operations
function evaluateExpression(expression) {
    try {
        // Remove any spaces
        const expr = expression.replace(/\s/g, '');
        
        // Handle negative numbers at start or after operators
        let normalizedExpr = expr
            .replace(/^-/, '0-') // Handle negative at start
            .replace(/([+\-*/])-/g, '$1(0-'); // Handle negatives after operators
        
        // Add closing parentheses for negative numbers
        let openParens = (normalizedExpr.match(/\(/g) || []).length;
        let closeParens = (normalizedExpr.match(/\)/g) || []).length;
        normalizedExpr += ')'.repeat(openParens - closeParens);
        
        // Use Function constructor for safe evaluation with proper order of operations
        const result = Function('"use strict"; return (' + normalizedExpr + ')')();
        
        // Round to 10 decimal places to avoid floating point errors
        return Math.round(result * 10000000000) / 10000000000;
    } catch (e) {
        return 0;
    }
}

// React Component
const { useState } = React;

function Calculator() {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);
    const [lastOperator, setLastOperator] = useState('');

    // Handle number button click
    const handleNumber = (num) => {
        // If waiting for new value (after operator or equals), start fresh
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            // Prevent leading zeros (except for decimals)
            if (display === '0' && num !== '.') {
                setDisplay(String(num));
            } else {
                setDisplay(display + num);
            }
        }
    };

    // Handle decimal point
    const handleDecimal = () => {
        // Don't add multiple decimals to the same number
        if (!display.includes('.')) {
            if (waitingForNewValue) {
                setDisplay('0.');
                setWaitingForNewValue(false);
            } else {
                setDisplay(display + '.');
            }
        }
    };

    // Handle operator button click
    const handleOperator = (op) => {
        const currentValue = parseFloat(display);

        if (expression === '') {
            // First number
            setExpression(currentValue + op);
            setLastOperator(op);
            setWaitingForNewValue(true);
        } else {
            // Handle consecutive operators
            if (waitingForNewValue) {
                // Replace last operator if another operator pressed
                if (op === '-' && lastOperator !== '-') {
                    // Allow negative numbers
                    setExpression(expression + op);
                } else if (op !== '-') {
                    // Replace operator
                    setExpression(expression.slice(0, -1) + op);
                    setLastOperator(op);
                }
            } else {
                // Calculate intermediate result
                const lastNum = expression.split(/[+\-*/]/).pop();
                const expr = expression + currentValue;
                const result = evaluateExpression(expr);
                setDisplay(String(result));
                setExpression(result + op);
                setLastOperator(op);
                setWaitingForNewValue(true);
            }
        }
    };

    // Handle equals button
    const handleEquals = () => {
        if (expression !== '') {
            const currentValue = parseFloat(display);
            const fullExpression = expression + currentValue;
            const result = evaluateExpression(fullExpression);
            setDisplay(String(result));
            setExpression('');
            setWaitingForNewValue(true);
            setLastOperator('');
        }
    };

    // Handle clear button
    const handleClear = () => {
        setDisplay('0');
        setExpression('');
        setWaitingForNewValue(false);
        setLastOperator('');
    };

    return (
        <div className="calculator-container">
            <div className="calculator-title">🧮 Calculator</div>
            <div id="display">{display}</div>
            <div className="calculator-grid">
                {/* Row 1 */}
                <button id="clear" className="calculator-button" onClick={handleClear}>
                    AC
                </button>
                <button id="divide" className="calculator-button operator-button" onClick={() => handleOperator('/')}>
                    ÷
                </button>
                <button id="multiply" className="calculator-button operator-button" onClick={() => handleOperator('*')}>
                    ×
                </button>

                {/* Row 2 */}
                <button id="seven" className="calculator-button number-button" onClick={() => handleNumber(7)}>
                    7
                </button>
                <button id="eight" className="calculator-button number-button" onClick={() => handleNumber(8)}>
                    8
                </button>
                <button id="nine" className="calculator-button number-button" onClick={() => handleNumber(9)}>
                    9
                </button>
                <button id="subtract" className="calculator-button operator-button" onClick={() => handleOperator('-')}>
                    −
                </button>

                {/* Row 3 */}
                <button id="four" className="calculator-button number-button" onClick={() => handleNumber(4)}>
                    4
                </button>
                <button id="five" className="calculator-button number-button" onClick={() => handleNumber(5)}>
                    5
                </button>
                <button id="six" className="calculator-button number-button" onClick={() => handleNumber(6)}>
                    6
                </button>
                <button id="add" className="calculator-button operator-button" onClick={() => handleOperator('+')}>
                    +
                </button>

                {/* Row 4 */}
                <button id="one" className="calculator-button number-button" onClick={() => handleNumber(1)}>
                    1
                </button>
                <button id="two" className="calculator-button number-button" onClick={() => handleNumber(2)}>
                    2
                </button>
                <button id="three" className="calculator-button number-button" onClick={() => handleNumber(3)}>
                    3
                </button>
                <button id="equals" className="calculator-button" onClick={handleEquals}>
                    =
                </button>

                {/* Row 5 */}
                <button id="zero" className="calculator-button number-button" onClick={() => handleNumber(0)} style={{ gridColumn: 'span 2' }}>
                    0
                </button>
                <button id="decimal" className="calculator-button" onClick={handleDecimal}>
                    .
                </button>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<Calculator />, document.getElementById('root'));
