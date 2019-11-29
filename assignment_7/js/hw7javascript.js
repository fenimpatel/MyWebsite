/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_7/js/hw7javascript.js
    COMP 4610 Assignment: Assignment 7 - Using the jQuery Validation Plugin with Your Dynamic Table
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: November 23, 2019 at 3:00 PM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: November 29, 2019 at 9:10 AM by Fenim Patel
    Description: hw7javascript.js file is to create the multiplication table and display the multiplication table using jQuery and jQuery Validation Plugin.
*/

// createMultiplicationTable is a function that takes parameters which are startingValueOfMultiplier,
// endingValueOfMultiplier, startingValueOfMultiplicand, endingValueOfMultiplicand
function createMultiplicationTable(startingValueOfMultiplier, endingValueOfMultiplier, startingValueOfMultiplicand, endingValueOfMultiplicand) {
    var multiplicationTable;
    multiplicationTable = document.createElement('multiplicationTable');
    multiplicationTable.id = 'multiplicationTable';
    var rowOne;
    rowOne = true;
    var columnOne;
    columnOne = true;

    for(var i = startingValueOfMultiplicand - 1; i <= endingValueOfMultiplicand; i++) {
        var multiplicationTableRow;

        multiplicationTableRow = document.createElement('tr');

        for(var j = startingValueOfMultiplier - 1; j <= endingValueOfMultiplier; j++) {
            var multiplicationTableCell;
            var multiplicationTableCellText;

            if(rowOne != true){
                if(columnOne != true) {
                    multiplicationTableCell = document.createElement('td');
                    // text node with value of i multiplied by value of j is created and assigned to multiplicationTableCellText
                    multiplicationTableCellText = document.createTextNode(i * j);
                    // member function named appendChild() of multiplicationTableCell is
                    // called which takes multiplicationTableCellText as an argument
                    multiplicationTableCell.appendChild(multiplicationTableCellText);
                }
                else {
                    multiplicationTableCell = document.createElement('th');
                    // text node with value of i is created and assigned to multiplicationTableCellText
                    multiplicationTableCellText = document.createTextNode(i);
                    // member function named appendChild() of multiplicationTableCell is
                    // called which takes multiplicationTableCellText as an argument
                    multiplicationTableCell.appendChild(multiplicationTableCellText);
                }
            }
            else {
                multiplicationTableCell = document.createElement('th');

                if(columnOne != true) {
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
            columnOne = false;
        }

        // member function named appendChild() of multiplicationTable is
        // called which takes multiplicationTableRow as an argument
        multiplicationTable.appendChild(multiplicationTableRow);
        rowOne = false;
        columnOne = true;
    }

    return multiplicationTable;
}

// appendOrReplaceElement is a function that takes parameters which are element and parent
function appendOrReplaceElement(element, parent) {
    var previousElement;

    // if not of document's member function named getElementById() which takes argument id which is a member
    // of element is assigned to previousElement and parent which is a member of previousElement has equal value
    // and equal type as parent then execute the statements inside the if condition
    if(!((previousElement = document.getElementById(element.id)) && (previousElement.parent === parent))) {
        // parent's member function appendChild() which takes argument element is called
        parent.appendChild(element);

    }
    else {
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
            var $maximum = $(param)
            if(this.settings.onfocusout) {
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
            var $minimum = $(param);
            if(this.settings.onfocusout) {
                // calls $minimum's member function named off() which takes ".validate-greaterThanEqual" as event and member function named on()
                // which takes "blur.validate-greaterThanEqual" and function() { $(element)'s member function named valid() } as event
                $minimum.off(".validate-greaterThanEqual").on("blur.validate-greaterThanEqual", function() {
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
                // specifies startingValueForMultiplier element as reuiqred, number, cannot be a decimal and compares
                // if startingValueForMultiplier is less than or equal to endingValueForMultiplier
                startingValueForMultiplier: {
                    required: true,
                    number: true,
                    step: 1,
                    lessThanEqual: '#endingValueForMultiplier'
                },

                // specifies endingValueForMultiplier element as reuiqred, number, cannot be a decimal and compares
                // if endingValueForMultiplier is greater than or equal to startingValueForMultiplier
                endingValueForMultiplier: {
                    required: true,
                    number: true,
                    step: 1,
                    greaterThanEqual: '#startingValueForMultiplier'
                },

                // specifies startingValueForMultiplicand element as reuiqred, number, cannot be a decimal and compares
                // if startingValueForMultiplicand is less than or equal to endingValueForMultiplicand
                startingValueForMultiplicand: {
                    required: true,
                    number: true,
                    step: 1,
                    lessThanEqual: '#endingValueForMultiplicand'
                },

                // specifies endingValueForMultiplicand element as reuiqred, number, cannot be a decimal and compares
                // if endingValueForMultiplicand is greater than or equal to startingValueForMultiplicand
                endingValueForMultiplicand: {
                    required: true,
                    number: true,
                    step: 1,
                    greaterThanEqual: '#startingValueForMultiplicand'
                }
            },

            messages: { // key/value pair that defines custom messages
                startingValueForMultiplier: { // validates startingValueForMultiplier field as required, number, and step with their own custom message
                    required: 'Cannot have an empty value!',
                    number: 'Value should be an integer value!',
                    step: 'Decimal value is not allowed, value should be an integer!'
                },

                endingValueForMultiplier: { // validates endingValueForMultiplier field as required, number, and step with their own custom message
                    required: 'Cannot have an empty value!',
                    number: 'Value should be an integer value!',
                    step: 'Decimal value is not allowed, value should be an integer!'
                },

                startingValueForMultiplicand: { // validates startingValueForMultiplicand field as required, number, and step with their own custom message
                    required: 'Cannot have an empty value!',
                    number: 'Value should be an integer value!',
                    step: 'Decimal value is not allowed, value should be an integer!'
                },

                endingValueForMultiplicand: { // validates endingValueForMultiplicand field as required, number, and step with their own custom message
                    required: 'Cannot have an empty value!',
                    number: 'Value should be an integer value!',
                    step: 'Decimal value is not allowed, value should be an integer!'
                }
            },

            submitHandler: function(formForMultiplicationTable, event) { // callback for handeling actual submit when form is valid
                event.preventDefault(); // event's member function named preventDefault() is called to prevent from submitting a form when clicking on "Submit" button

                var multiplicationTable;
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
