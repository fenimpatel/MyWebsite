/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_7/js/hw7javascript.js
    COMP 4610 Assignment: Assignment 7 - Using the jQuery Validation Plugin with Your Dynamic Table
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: November 23, 2019 at 3:00 PM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: November 27, 2019 at 2:15 PM by Fenim Patel
    Description: hw7javascript.js file is to create the multiplication table and display the multiplication table using jQuery and jQuery Validation Plugin.
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
    var initialize = function() { // anonymous function is assigned to a variable initialize
        // adds validation method named lessThanEqual where first argument is current value of validated element,
        // second argument is element to be validated, and third argument is param specified for method and I used http://jsfiddle.net/tUPQc/2/ as a reference
        jQuery.validator.addMethod("lessThanEqual", function(value, element, param) {
            var $maximum = $(param); // $(param) is assigned to $maximum
            if(this.settings.onfocusout) { // if this' member named settings' member named onfocusout then execute the statements inside the if condition
                // calls $maximum's member function named off() which takes ".validate-lessThanEqual" as event and member function named on()
                // which takes "blur.validate-lessThanEqual" and function() { $(element)'s member function named valid() } as event
                $maximum.off(".validate-lessThanEqual").on("blur.validate-lessThanEqual", function() {
                    $(element).valid();
                });
            }

            // returns value of the result of comparing parseInt() which takes value is less than or equal to parseInt() which takes $maximum's member function named val()
            return parseInt(value) <= parseInt($maximum.val());
        }, "Starting value must be less than or equal to ending value!"); // string that is passed as third argument

        // adds validation method named greaterThanEqual where first argument is current value of validated element,
        // second argument is element to be validated, and third argument is param specified for method and I used http://jsfiddle.net/tUPQc/2/ as a reference
        jQuery.validator.addMethod("greaterThanEqual", function(value, element, param) {
            var $minimum = $(param); // $(param) is assigned to $minimum
            if(this.settings.onfocusout) { // if this' member named settings' member named onfocusout then execute the statements inside the if condition
                // calls $minimum's member function named off() which takes ".validate-greaterThanEqual" as event and member function named on()
                // which takes "blur.validate-greaterThanEqual" and function() { $(element)'s member function named valid() } as event
                $minimum.off(".validate-greaterThanEqual").on("blur.validate-greaterThanEqual", function() { //change validate-greaterThan to validate-greaterThanEqual
                    $(element).valid();
                });
            }

            // returns value of the result of comparing parseInt() which takes value is greater than or equal to parseInt() which takes $minimum's member function named val()
            return parseInt(value) >= parseInt($minimum.val());
        }, "Ending value must be greater than or equal to starting value!"); // string that is passed as third argument

        // prevents form from submitting and helps set up validation with warnings about missing methods and other messages and I used
        // https://stackoverflow.com/questions/14179417/jquery-validation-rules-and-messages and https://jqueryvalidation.org/validate/ as a reference to help me out
        $('#formForMultiplicationTable').validate( {
            rules: { // key/value pair that defines custom rules
                startingValueForMultiplier: { // compound rule
                    required: true, // specifies startingValueForMultiplier element as required
                    number: true, // specifies startingValueForMultiplier element as number
                    step: 1, // specifies startingValueForMultiplier element as step so that value cannot be a decimal
                    lessThanEqual: '#endingValueForMultiplier' // specifies startingValueForMultiplier element to call lessThanEqual function which will compare
                    // if startingValueForMultiplier is less than or equal to endingValueForMultiplier
                },

                endingValueForMultiplier: { // compound rule
                    required: true, // specifies endingValueForMultiplier element as required
                    number: true, // specifies endingValueForMultiplier element as number
                    step: 1, // specifies endingValueForMultiplier element as step so that value cannot be a decimal
                    greaterThanEqual: '#startingValueForMultiplier' // specifies endingValueForMultiplier element to call greaterThanEqual function which will compare
                    // if endingValueForMultiplier is greater than or equal to startingValueForMultiplier
                },

                startingValueForMultiplicand: { // compound rule
                    required: true, // specifies startingValueForMultiplicand element as required
                    number: true, // specifies startingValueForMultiplicand element as number
                    step: 1, // specifies startingValueForMultiplicand element as step so that value cannot be a decimal
                    lessThanEqual: '#endingValueForMultiplicand' // specifies startingValueForMultiplicand element to call lessThanEqual function which will compare
                    // if startingValueForMultiplicand is less than or equal to endingValueForMultiplicand
                },

                endingValueForMultiplicand: { // compound rule
                    required: true, // specifies endingValueForMultiplicand element as required
                    number: true, // specifies endingValueForMultiplicand element as number
                    step: 1, // specifies endingValueForMultiplicand element as step so that value cannot be a decimal
                    greaterThanEqual: '#startingValueForMultiplicand' // specifies endingValueForMultiplicand element to call greaterThanEqual function which will compare
                    // if endingValueForMultiplicand is greater than or equal to startingValueForMultiplicand
                }
            },

            messages: { // key/value pair that defines custom messages
                startingValueForMultiplier: { // validates startingValueForMultiplier field as required, number, and step
                    required: 'Cannot have an empty value!', // custom message will be 'Cannot have an empty value!' for required
                    number: 'Value should be an integer value!', // custom message will be 'Value should be an integer value!' for number
                    step: 'Decimal value is not allowed, value should be an integer!' // custom message will be 'Decimal value is not allowed, value should be an integer!' for step
                },

                endingValueForMultiplier: { // validates endingValueForMultiplier field as required, number, and step
                    required: 'Cannot have an empty value!', // custom message will be 'Cannot have an empty value!' for required
                    number: 'Value should be an integer value!', // custom message will be 'Value should be an integer value!' for number
                    step: 'Decimal value is not allowed, value should be an integer!' // custom message will be 'Decimal value is not allowed, value should be an integer!' for step
                },

                startingValueForMultiplicand: { // validates startingValueForMultiplicand field as required, number, and step
                    required: 'Cannot have an empty value!', // custom message will be 'Cannot have an empty value!' for required
                    number: 'Value should be an integer value!', // custom message will be 'Value should be an integer value!' for number
                    step: 'Decimal value is not allowed, value should be an integer!' // custom message will be 'Decimal value is not allowed, value should be an integer!' for step
                },

                endingValueForMultiplicand: { // validates endingValueForMultiplicand field as required, number, and step
                    required: 'Cannot have an empty value!', // custom message will be 'Cannot have an empty value!' for required
                    number: 'Value should be an integer value!', // custom message will be 'Value should be an integer value!' for number
                    step: 'Decimal value is not allowed, value should be an integer!' // custom message will be 'Decimal value is not allowed, value should be an integer!' for step
                }
            },

            submitHandler: function(formForMultiplicationTable, event) { // callback for handeling actual submit when form is valid
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
            }
        });
    }

    return {
        initialize: initialize // exposes private function initialize as public
    };
})(); // () means that function is called and assigned the returned object instead of the function itself for the value of HandleFormForMultiplicationTable

// calls document's member function addEventListener() which takes arguments 'DOMContentLoaded' and
// HandleFormForMultiplicationTable's member initialize to initialize event listeners that depends on DOM
document.addEventListener('DOMContentLoaded', HandleFormForMultiplicationTable.initialize);
