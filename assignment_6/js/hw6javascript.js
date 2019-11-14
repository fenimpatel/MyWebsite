/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_6/js/hw6javascript.js
    COMP 4610 Assignment: Assignment 6 - Creating an Interactive Dynamic Table
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: November 7, 2019 at 8:00 PM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: November 13, 2019 at 8:30 PM by Fenim Patel
    Description: hw6javascript.js file is to create the multiplication table and display the multiplication table.
*/

// createMultiplicationTable is a function that takes parameters which are startingValueOfMultiplier,
// endingValueOfMultiplier, startingValueOfMultiplicand, endingValueOfMultiplicand
function createMultiplicationTable(startingValueOfMultiplier, endingValueOfMultiplier, startingValueOfMultiplicand, endingValueOfMultiplicand) {
    var multiplicationTable; // variable named multiplicationTable is created
    // element named 'multiplicationTable' is created and assigned to multiplicationTable
    multiplicationTable = document.createElement('multiplicationTable');
    // 'multiplicationTable' is assigned to id which is a member of multiplicationTable
    multiplicationTable.id = 'multiplicationTable';
    var rowOne; // variable named rowOne is created
    rowOne = true; // true is assigned to rowOne
    var columnOne; // variable named columnOne is created
    columnOne = true; // true is assigned to columnOne

    // for loop starts at i = startingValueOfMultiplicand minus 1 and runs until i is less than
    // or equal to endingValueOfMultiplicand, and i is incremented by 1 each time the loop runs
    for(var i = startingValueOfMultiplicand - 1; i <= endingValueOfMultiplicand; i++) {
        var multiplicationTableRow; // variable named multiplicationTableRow is created

        // element named 'tr' is created and assigned to multiplicationTableRow
        multiplicationTableRow = document.createElement('tr');

        // for loop starts at j = startingValueOfMultiplier minus 1 and runs until j is less than
        // or equal to endingValueOfMultiplier, and j is incremented by 1 each time the loop runs
        for(var j = startingValueOfMultiplier - 1; j <= endingValueOfMultiplier; j++) {
            var multiplicationTableCell; // variable named multiplicationTableCell is created
            var multiplicationTableCellText; // variable named multiplicationTableCellText is created

            if(rowOne != true){ // if rowOne is not equal to true then execute the statements inside the if condition
                if(columnOne != true) { // if columnOne is not equal to true then execute the statements inside the if condition
                    // element named 'td' is created and assigned to multiplicationTableCell
                    multiplicationTableCell = document.createElement('td');
                    // text node with value of i multiplied by value of j is created and assigned to multiplicationTableCellText
                    multiplicationTableCellText = document.createTextNode(i * j);
                    // member function named appendChild() of multiplicationTableCell is
                    // called which takes multiplicationTableCellText as an argument
                    multiplicationTableCell.appendChild(multiplicationTableCellText);
                }
                else { // else execute the statements inside the else condition
                    // element named 'th' is created and assigned to multiplicationTableCell
                    multiplicationTableCell = document.createElement('th');
                    // text node with value of i is created and assigned to multiplicationTableCellText
                    multiplicationTableCellText = document.createTextNode(i);
                    // member function named appendChild() of multiplicationTableCell is
                    // called which takes multiplicationTableCellText as an argument
                    multiplicationTableCell.appendChild(multiplicationTableCellText);
                }
            }
            else { // else execute the statements inside the else condition
                // element named 'th' is created and assigned to multiplicationTableCell
                multiplicationTableCell = document.createElement('th');

                if(columnOne != true) { // if columnOne is not equal to true then execute the statements inside the if condition
                    // text node with value of j is created and assigned to multiplicationTableCellText
                    multiplicationTableCellText = document.createTextNode(j);
                    // member function named appendChild() of multiplicationTableCell is called
                    // which takes multiplicationTableCellText as an argument
                    multiplicationTableCell.appendChild(multiplicationTableCellText);
                }
            }

            // member function named appendChild() of multiplicationTableRow is
            // called which takes multiplicationTableCell as an argument
            multiplicationTableRow.appendChild(multiplicationTableCell);
            columnOne = false; // false is assigned to columnOne
        }

        // member function named appendChild() of multiplicationTable is
        // called which takes multiplicationTableRow as an argument
        multiplicationTable.appendChild(multiplicationTableRow);
        rowOne = false; // false is assigned to rowOne
        columnOne = true; // true is assigned to columnOne
    }

    return multiplicationTable; // returns multiplicationTable
}

// appendOrReplaceElement is a function that takes parameters which are element and parent
function appendOrReplaceElement(element, parent) {
    var previousElement; // variable named previousElement is created

    // if not of document's member function named getElementById() which takes argument id which is a member
    // of element is assigned to previousElement and parent which is a member of previousElement has equal value
    // and equal type as parent then execute the statements inside the if condition
    if(!((previousElement = document.getElementById(element.id)) && (previousElement.parent === parent))) {
        // parent's member function appendChild() which takes argument element is called
        parent.appendChild(element);

    }
    else { // else execute the statment inside the else condition
        // parent's member function named replaceChild() which takes arguments element and previousElement is called
        parent.replaceChild(element, previousElement);
    }
}

// anonymous function is assigned to a variable HandleFormForMultiplicationTable and I used https://www.intertech.com/Blog/encapsulation-in-javascript/ as a reference
var HandleFormForMultiplicationTable = (function() {
    var formForMultiplicationTable; // variable named formForMultiplicationTable is created
    var errorWithStarting; // variable named errorWithStarting is created
    // 'Starting value must be less than or equal to ending value.' is assigned to errorWithStarting
    errorWithStarting = 'Starting value must be less than or equal to ending value.';
    var errorWithEnding; // variable named errorWithEnding is created
    // 'Ending value must be greater than or equal to starting value.' is assigned to errorWithEnding
    errorWithEnding = 'Ending value must be greater than or equal to starting value.';

    var initialize = function() { // anonymous function is assigned to a variable initialize
        // document's member function named getElementById() which takes 'formForMultiplicationTable' is assigned to formForMultiplicationTable
        formForMultiplicationTable = document.getElementById('formForMultiplicationTable');

        // formForMultiplicationTable's member function named addEventListener() which takes arguments 'submit'and function(event) attaches an event handler to document
        formForMultiplicationTable.addEventListener('submit', function(event) {
            event.preventDefault(); // event's member function named preventDefault() is called to prevent from submitting a form when clicking on "Submit" button

            var multiplicationTable; // variable named multiplicationTable is created
            // return value from a call to createMultiplicationTable() which takes formForMultiplicationTable's member named elements['startingValueForMultiplier']'s
            // value, formForMultiplicationTable's member named elements['endingValueForMultiplier']'s value, formForMultiplicationTable's member named
            // elements['startingValueForMultiplicand']'s value, and formForMultiplicationTable's member named elements['endingValueForMultiplicand']'s value is
            // assigned to multiplicationTable
            multiplicationTable = createMultiplicationTable(formForMultiplicationTable.elements['startingValueForMultiplier'].value,
                                                            formForMultiplicationTable.elements['endingValueForMultiplier'].value,
                                                            formForMultiplicationTable.elements['startingValueForMultiplicand'].value,
                                                            formForMultiplicationTable.elements['endingValueForMultiplicand'].value);
            // calls appendOrReplaceElement() which takes multiplicationTable and formForMultiplicationTable
            appendOrReplaceElement(multiplicationTable, formForMultiplicationTable);
        });

        // for loop starts at x = 0 and runs until x is less than formForMultiplicationTable's member named elements's length, and x is incremented by 1 each time the loop runs
        for (var x = 0; x < formForMultiplicationTable.elements.length; x++) {
            // if formForMultiplicationTable's member named elements[x]'s type is not equal value or not equal type as 'number' then execute the statement inside the if condition
            if(formForMultiplicationTable.elements[x].type !== 'number') {
                continue; // continues
            }

            // calls formForMultiplicationTable's member named elements[x]'s member function named addEventListener() which takes arguments 'input',
            // and validate to add event listener to all of form's inputs which are 'number'
            formForMultiplicationTable.elements[x].addEventListener('input', validate);
        }
    }

    var validate = function() { // anonymous function is assigned to a variable validate
        var starting; // variable named starting is created
        var ending; // variable named ending is created

        // if this's member named name is equal value and equal type as 'startingValueForMultiplier' or this's member named name is
        // equal value and equal type as 'endingValueForMultiplier' then execute the statements inside the if condition
        if(this.name === 'startingValueForMultiplier' || this.name === 'endingValueForMultiplier') {
            // formForMultiplicationTable's member named elements['startingValueForMultiplier'] is assigned to starting
            starting = formForMultiplicationTable.elements['startingValueForMultiplier'];
            // formForMultiplicationTable's member named elements['endingValueForMultiplier'] is assigned to ending
            ending = formForMultiplicationTable.elements['endingValueForMultiplier'];
        }
        // else if this's member named name is equal value and equal type as 'startingValueForMultiplicand' or this's member named name is
        // equal value and equal type as 'endingValueForMultiplicand' then execute the statements inside the else if condition
        else if(this.name === 'startingValueForMultiplicand' || this.name === 'endingValueForMultiplicand') {
            // formForMultiplicationTable's member named elements['startingValueForMultiplicand'] is assigned to starting
            starting = formForMultiplicationTable.elements['startingValueForMultiplicand'];
            // formForMultiplicationTable's member named elements['endingValueForMultiplicand'] is assigned to ending
            ending = formForMultiplicationTable.elements['endingValueForMultiplicand'];
        }

        var checkStartingAndEnding; // variable named checkStartingAndEnding is created

        // if parseInt() which takes arguments starting's member named value and 10 is called so that it parses string
        // and returns integer is greater than parseInt() which takes arguments ending's member named value and 10 is
        // called so that it parses string and returns integer then execute the statements inside the if condition
        if(parseInt(starting.value, 10) > parseInt(ending.value, 10)) {
            checkStartingAndEnding = true; // assign true to checkStartingAndEnding
        }

        // if starting's length is not equal value or not equal type as 0 and ending's length is not equal value or not equal type as 0
        // and checkStartingAndEnding is equal to true then execute the statements inside the if condition
        if(starting.length !== 0 && ending.length !== 0 && checkStartingAndEnding == true) {
            // calls starting's member function named setCustomValidity() which takes argument errorWithStarting to add custom error message
            starting.setCustomValidity(errorWithStarting);
            // calls ending's member function named setCustomValidity() which takes argument errorWithEnding to add custom error message
            ending.setCustomValidity(errorWithEnding);
        }
        else { // else execute the statment inside the else condition
            // calls starting's member function named setCustomValidity() which takes argument errorWithStarting to add '' as custom error message
            starting.setCustomValidity('');
            // calls ending's member function named setCustomValidity() which takes argument errorWithEnding to add '' as custom error message
            ending.setCustomValidity('');
        }
    }

    return {
        initialize: initialize // exposes private function initialize as public
    };
})(); // () means that function is called and assigned the returned object instead of the function itself for the value of HandleFormForMultiplicationTable

// calls document's member function addEventListener() which takes arguments 'DOMContentLoaded' and
// HandleFormForMultiplicationTable's member initialize to initialize event listeners that depends on DOM
document.addEventListener('DOMContentLoaded', HandleFormForMultiplicationTable.initialize);
