// How does a calculator work? 
// Assumption: we're doing a sequential order of operations, not a BEDMAS process.
// The user enters in a series of button presses. Those button presses can be numbers, a decimal point, an operator (+, -, x, /), an instruction to execute result (=), or an instruction to clear working number (clear entry), or everything (clear all).
// We start with a workingNumber variable, a Total variable, and an entries array.

let entries = [];
let workingNumber = '';

// Function to update the display
// TODO make sure displayed number isn't longer than the display and rounds for display only.
// TODO make sure displayed number only shows to 4DP.
function updateDisplay() {
    if (workingNumber === '') {
        document.getElementById('answer').value = 0;     
    }
    else if (workingNumber != '') {
        if (typeof workingNumber === 'string') {
            document.getElementById('answer').value = workingNumber;     
        } else {
            let num = Number(workingNumber);
            if ((!Number.isInteger(num)) && (num < 1000000)) {
            num = num.toFixed(4).replace(/0+$/, "");
            } else if (!Number.isInteger(num) && num >= 1000000 && num < 10000000) {
            num = num.toFixed(3).replace(/0+$/, "");
            } else if (!Number.isInteger(num) && num >= 10000000 && num < 100000000) {
            num = num.toFixed(2).replace(/0+$/, "");
            } else if (!Number.isInteger(num) && num >= 100000000 && num < 1000000000) {
            num = num.toFixed(1).replace(/0+$/, "");
            } else if (Number.isInteger(num) && (num < 1000000000)) {
                num = num;
            } else {
              num = num.toPrecision(10);
            }
        document.getElementById('answer').value = num;
        }
    }
}

// set initial display

updateDisplay();

// Function to identify a symbol
function isSymbol(value) {
    return (value === '+' || value === '-' || value === '*' || value === '/');
}

// Create a function to calculate
function calculate(array) {
    // The calculate function is passed the array, which has a set of strings in it.
    // We need to start by taking the first string in the array and making it a number, and assign it to a variable runningTotal.
    let runningTotal = Number(array[0]);
    // Then, we need to loop through the array, starting at position 1, which is first operator, and going until length of the array.
    for (i = 1; i < array.length; i++) {
    // we need to assign i to a variable called operator. This is still a string.
    // we need to assign i+1 to a variable called nextNumber, and also change the strings to a number using the built in Number function.
        let symbol = array[i];
        let nextNumber = Number(array[i+1]);
        // we then need to look at the operator variable. If it is a +, we need to take runningTotal and assign it as runningTotal + nextNumber.
        if (symbol === '+'){
            runningTotal += nextNumber;
        }
        else if (symbol === '-'){
            runningTotal -= nextNumber;
        }
        else if (symbol === '*'){
            runningTotal *= nextNumber;
        }
        else if (symbol === '/'){
            runningTotal /= nextNumber;
        }
        i++
    } 
    return runningTotal;
}

// Create a function that takes the element return by event handler and and assigns the value to a variable.
function handleEntries() {
    let value = this.value;
    console.log('value is ' + value);
    // Handle clearing temp or all values.
    // When we hit a 'clear entry', we clear the display, and we clear the working number variable.
    if (value === 'CE') {
        workingNumber = '';
        updateDisplay();
    }
    // When we hit a 'clear all', we clear the display, the working number, the array, and the result.
    else if (value === 'AC') {
        workingNumber = '';
        entries = [];
        total = 0;
        updateDisplay();
    }
    // Handle equals when array empty.
    else if (value === '=' && entries.length === 0 && (workingNumber === '' || workingNumber === '-')) {
        return;
    }
    // First, let's deal with negative and positive indications.
    // if we hit a negative while there is no working number, we are going to treat following number as a negative number 
    else if (value === 'posneg' && workingNumber === '') {
        workingNumber = '-';
        updateDisplay();
    // if we hit posneg when working num is -, we remove -.        
    } else if (value === 'posneg' && workingNumber === '-') {
        workingNumber = '';
        updateDisplay();    
    }
    // // if we hit posneg when working num doesn't start with a -, we add - to the start of workingnum        
    else if (value === 'posneg' && !workingNumber.startsWith('-')) {
        workingNumber = '-' + workingNumber;
        updateDisplay();
    }    
    // // if we hit posneg when the working num starts with a -, we slice off the - from front.    
    else if (value === 'posneg' && workingNumber.startsWith('-')) {
        workingNumber = workingNumber.slice(1);
    }    
    // Then, let's deal with exceptions like extra 0 at start, decimal places, and changing symbol.
    // if the value is 0, we check to see if workingNumber === 0. If it is, we ignore so we don't add extra 0s.
    else if (value === '0' && workingNumber === '0') {
        return;
    } 
    // If they hit a decimal point, we check that the last item in the workingNumber isn't already a decimal point. If it is, we ignore it.
    else if (value === '.' && workingNumber.endsWith('.')) {
        return;
    }
    // If a symbol is entered, there is no working number, and we have items in our array, we want to change that symbol to the entry. the last entry will always be a symbol.
    else if (isSymbol(value) && entries.length > 0 && workingNumber === '') {
        // remove last item
        entries.pop();
        // add new operator
        entries.push(value);    
    }
    // Then, let's handle building the number we're working on.
    // While they are typing a number or decimal, we build a working number which is displayed in the display. This display has a maximum length of x.
    // otherwise, if value is number or a ., append to workingNumber string
    else if (!isNaN(value) || value === '.') {
        workingNumber += value;
        updateDisplay();
    }
    // Once we hit a symbol, we're ready to submit our number. We push in the workingNumber, then the operator, then we clear the working number, and update display.
    else if (isSymbol(value) && workingNumber != '' && workingNumber != '-') {
        entries.push(workingNumber);
        entries.push(value);
        workingNumber = '';
        updateDisplay();
    } 
    // if equals, 
    else if(value === '='){
        // push the last number in workingNum to array if there is something there.
        if (workingNumber != '' && workingNumber != '-'){
            entries.push(workingNumber);
        }
        // if nothing there, remove last symbol.
        else if (workingNumber === '' || workingNumber === '-'){
            entries.pop();
        }
        // once that is done, set working number to result of calculate
        workingNumber = calculate(entries);
        entries = [];
        updateDisplay();
    }
    //log the numbers to see where we're at.
    console.log('workingNumber is ' + workingNumber);
    console.log('entries is ' + entries);
};



// Get all the buttons.
let buttons = document.getElementsByTagName("button");

// Add an event listener to the buttons for a click that runs a function called 'calculate'
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleEntries);
}






// Extension: take keyboard inputs.
// Extension: handle %. When we hit a % operator, we take the temp number, add it to the array, followed by '* 100 /'. We then clear the display.