const resetButton = document.getElementById('reset-button');
const equalButton = document.getElementById('equal-button');
const deleteButton = document.getElementById('delete-button');
const screen = document.getElementById('screen');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');

//variables
var variables = ['', ''];
var operator = '';
var id = 0;

function reset() {
    variables = ['', ''];
    operator = '';
    id = 0;
    updateScreen();
}

function updateScreen() {
    if (variables[id] === '') {
        screen.innerText = '0';
    } else {
        screen.innerText = variables[id];
    }
}

function del() {
    if(variables[id].length > 0) {
        variables[id] = variables[id].substr(0, variables[id].length - 1);
        updateScreen();
    }
}

function calculate() {
    var result = eval(variables[0] + operator + variables[1]);
    operator = '';
    variables[1] = '';
    variables[0] = result;
    id = 0;
    updateScreen();
    variables[0] = '';
}

//Events
resetButton.addEventListener('click', reset);
numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        const regexp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/; 

        if(regexp.test(variables[id]+button.innerText)) {
            variables[id] += button.innerText;
            updateScreen();
        }
        
    });
});

deleteButton.addEventListener('click', del);

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(variables[0] === '' && screen.innerText != '0') {
            variables[0] = screen.innerText;
        }

        id++;
        switch(button.innerText) {
            case '+':
            case '-':
            case '/':
                operator = button.innerText;
                break;
            case 'x':
                operator = '*';
        }
    });
});

equalButton.addEventListener('click', calculate);