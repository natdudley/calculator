HTML
// create layout of calculator with appropriate buttons laid out in a grid. It will need a display, an AC, a CE, +, -, x, /, =, ., 0-9 numbers.


CSS
// lay buttons and displays out in a basic in a basic grid.
// style, using a library if desired



JS
// How does a calculator work? 
// Assumption: we're doing a sequential order of operations, not a BEDMAS process.
// The user enters in a series of button presses. Those button presses can be numbers, a decimal point, an operator (+, -, x, /), an instruction to execute result (=), or an instruction to clear working number (clear entry), or everything (clear all).
// Display starts showing 0.
// We listen for a click on buttons. When each button is clicked, we run a function. This function gets the label associated with the button.
// While they are typing a number or decimal, we build a working number which is displayed in the display. This display has a maximum length of x.
// If they click 0 and the working number has a length of 1 and that value is 0, ignore input.
// If they hit a decimal point, we check that the last number in the list isn't already a decimal point. If it is, we ignore it.
// When we hit a *, +, -, /, we check to see if the last entry in the array was also an operator. If so, we replace it with this one. If the last entry in array was a string, we push the temp number into an array, followed by the operator. We then clear the display.
// When we hit a 'clear entry', we clear the display, and we clear the working number variable.
// When we hit a 'clear all', we clear the display, the working number, the array, and the result.
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
    // When this finishes, we need to put the runningTotal in the display, and update the temp number to the runningTotal, so that if they hit an operator button, it will be added to array. We then need to clear the runningTotal and the array so they're ready for new input.
    // The result must be able to be displayed up to 4 DP.

// we may need something to handle negative numbers?? I don't entirely know how they'll work yet so just noting this down so that I can address it once I've tested it with some negatives.


// Extension: handle %. When we hit a % operator, we take the temp number, add it to the array, followed by '* 100 /'. We then clear the display.

