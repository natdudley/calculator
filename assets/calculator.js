// How does a calculator work? 
// Assumption: we're doing a sequential order of operations, not a BEDMAS process.
// The user enters in a series of button presses. Those button presses can be numbers, a decimal point, an operator (+, -, x, /), an instruction to execute result (=), or an instruction to clear working number (clear entry), or everything (clear all).
// We start with a workingNumber variable, a Total variable, and an entries array.

let entries = [];
let workingNumber = '';
let total = 0;

// Function to update the display

function updateDisplay() {
    if (workingNumber === '') {
        document.getElementById('answer').value = 0;     
    }
    else if (workingNumber != '') {
        document.getElementById('answer').value = workingNumber;
    }
}
// Function to identify a symbol
function isSymbol(value) {
    return (value === '+' || value === '-' || value === '*' || value === '/');
}

// set initial display

updateDisplay();

// Create a function that takes the element return by event handler and and assigns the value to a variable.
function calculate() {
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
    // if equals, run calculate function.
    // add result to workingNum
    // update display (which will show working num)
    // clear the entries array.

    //log the numbers to see where we're at.
    console.log('workingNumber is ' + workingNumber);
    console.log('entries is ' + entries);
};



// Get all the buttons.
let buttons = document.getElementsByTagName("button");
// Add an event listener to the buttons for a click that runs a function called 'calculate'

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', calculate);
}









// When we hit an equals, we take the last number in temp, push it to the array, and then need to execute the calculate function.
// The calculate function is passed the array, which has a set of strings in it.
    // We need to start by taking the first string in the array and making it a number, and assign it to a variable runningTotal.
    // Then, we need to loop through the array, starting at position 1, which is first operator, and going until length of the array.
    // we need to assign i to a variable called operator. This is still a string.
    // we need to assign i+1 to a variable called nextNumber, and also change the strings to a number using the built in Number function.
    // we then need to look at the operator variable. If it is a +, we need to take runningTotal and assign it as runningTotal + nextNumber.
    // Else if it is a -, we need to take runningTotal and assign it as runningTotal - nextNumber.
    // Else if it is a *, we need to take runningTotal and assign it as runningTotal * nextNumber.
    // Else if it is a /, we need to take runningTotal and assign it as runningTotal / nextNumber.
    // Then we need to increment i.
    // When this finishes, we need to put the runningTotal in the display, and update the workingNumber to the runningTotal, so that if they hit an operator button, it will be added to array. We then need to clear the runningTotal and the array so they're ready for new input.
    // The result must be able to be displayed up to 4 DP.

// we may need something to handle negative numbers?? I don't entirely know how they'll work yet so just noting this down so that I can address it once I've tested it with some negatives.

// Extension: take keyboard inputs.
// Extension: handle %. When we hit a % operator, we take the temp number, add it to the array, followed by '* 100 /'. We then clear the display.