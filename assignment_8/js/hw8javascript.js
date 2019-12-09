/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_8/js/hw8javascript.css
    COMP 4610 Assignment: Assignment 8 - Using the jQuery UI Slider and Tab Widgets
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: December 2, 2019 at 1:00 PM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: December 9, 2019 at 4:20 PM by Fenim Patel
    Description: hw8javascript.js file is to create the multiplication table and display multiplication table using jQuery UI Slider and Tab Widgets
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

           if(rowOne != true) {
               if(columnOne != true) {
                   multiplicationTableCell = document.createElement('td');
                   // text node with value of i multiplied by value of j is created and assigned to multiplicationTableCellText
                   multiplicationTableCellText = document.createTextNode(i * j);
                   multiplicationTableCell.appendChild(multiplicationTableCellText);
               }
               else {
                   multiplicationTableCell = document.createElement('th');
                   // text node with value of i is created and assigned to multiplicationTableCellText
                   multiplicationTableCellText = document.createTextNode(i);
                   multiplicationTableCell.appendChild(multiplicationTableCellText);
               }
           }
           else {
               multiplicationTableCell = document.createElement('th');

               if(columnOne != true) {
                   // text node with value of j is created and assigned to multiplicationTableCellText
                   multiplicationTableCellText = document.createTextNode(j);
                   multiplicationTableCell.appendChild(multiplicationTableCellText);
               }
           }

           multiplicationTableRow.appendChild(multiplicationTableCell);
           columnOne = false;
       }

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
       parent.appendChild(element);

   }
   else {
       parent.replaceChild(element, previousElement);
   }
}


var HandleFormForMultiplicationTable = (function() {
    var tabs;
    tabs = $('#tabbedTable').tabs();

    var handleTab;
    handleTab = tabs.find('ul');

    var counterForTab;
    counterForTab = 0;

    var initialize = function() { // anonymous function is assigned to a variable initialize
        // adds validation method named lessThanEqual where first argument is current value of validated element,
        // second argument is element to be validated, and third argument is param specified for method and I used http://jsfiddle.net/tUPQc/2/ as a reference
        jQuery.validator.addMethod("lessThanEqual", function(value, element, param) {
            var $maximum;
            $maximum = $(param)
            if(this.settings.onfocusout) {
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
            var $minimum;
            $minimum = $(param);
            if(this.settings.onfocusout) {
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
                    number:   true,
                    step:     1,
                    lessThanEqual: '#endingValueForMultiplier'
                },

                // specifies endingValueForMultiplier element as reuiqred, number, cannot be a decimal and compares
                // if endingValueForMultiplier is greater than or equal to startingValueForMultiplier
                endingValueForMultiplier: {
                    required: true,
                    number:   true,
                    step:     1,
                    greaterThanEqual: '#startingValueForMultiplier'
                },

                // specifies startingValueForMultiplicand element as reuiqred, number, cannot be a decimal and compares
                // if startingValueForMultiplicand is less than or equal to endingValueForMultiplicand
                startingValueForMultiplicand: {
                    required: true,
                    number:   true,
                    step:     1,
                    lessThanEqual: '#endingValueForMultiplicand'
                },

                // specifies endingValueForMultiplicand element as reuiqred, number, cannot be a decimal and compares
                // if endingValueForMultiplicand is greater than or equal to startingValueForMultiplicand
                endingValueForMultiplicand: {
                    required: true,
                    number:   true,
                    step:     1,
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
                event.preventDefault();  // prevents from submitting a form when clicking on "Submit" button
                makeTab(formForMultiplicationTable);
            }

        });

        $('.slider').slider( { // I used https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm as a reference to help me
            value: 0, // slider will be at value 0
            min: -100, // slider can go as low as -100
            max: 100, // slider can go as high as 100
            slide: function(event, ui) {
                $(this).siblings('input').val(ui.value);
                $(this).siblings('input').valid();
            },

            change: function(event, ui) {
                var formForMultiplicationTable;
                formForMultiplicationTable = $(this).closest("form")[0];

                updateCurrentTab(formForMultiplicationTable); // calls the function that will dynamically updates the multiplication table in current tab
            }
        });

        $('input[type="number"]').on('input', function(event) {
            $(this).siblings('.slider').slider('value', $(this).val());

            var formForMultiplicationTable;
            formForMultiplicationTable = $(this).closest("form")[0];

            updateCurrentTab(formForMultiplicationTable); // calls the function that will dynamically updates the multiplication table in current tab
        });

    };

    tabs.on('click', '.closeTab', function() { // handles what to do when tab is clicked to close and I used https://www.jacklmoore.com/notes/jquery-tabs/ as a reference
        var liElement;
        liElement = $(this).closest('li');

        var isIndex;
        isIndex = liElement.index();

        var currentIndex;
        currentIndex = tabs.tabs('option', 'active');

        $(liElement.find('a').attr('href')).remove();
        liElement.remove(); // removes the table from the tab that was clicked to close
        tabs.tabs('refresh');

        var left;
        left = handleTab.find('li').length;

        if( left === 0 ) {
            isTabVisibile(false); // after table is removed the tab should be hidden
        }
        else if( currentIndex === isIndex ) {
            if(left <= isIndex ) {
                isIndex = left - 1;
            }
            tabs.tabs('option', 'active', isIndex);
        }
    });

    $('#removeAllOfTheTabs').on( 'click', function() { // handles the way to remove all tabs
        handleTab.empty();
        tabs.find(":not(:first-child)").remove();
        tabs.tabs('refresh');
        isTabVisibile(false);
    });

    var isTabVisibile = function(display) {
        if(display != true) {
            tabs.addClass('hide');
            $('#removingAllTabs').addClass('hide');
        }
        else {
            tabs.removeClass('hide');
            $('#removingAllTabs').removeClass('hide');
        }
    }

    var makeTab = function(formForMultiplicationTable) { // function responsbile for making tab with all the information that is needed
        if(!tabs.is(':visible')) {
            isTabVisibile(true);
        }

        var tabUniqueID;
        tabUniqueID = "tab-" + counterForTab; // gives unique id to tab

        counterForTab++;

        var liElement;
        liElement = document.createElement('li');
        liElement.id = "handle-" + tabUniqueID;

        var aElement;
        aElement = document.createElement('a');
        aElement.href = "#" + tabUniqueID;
        liElement.appendChild(aElement);

        var divElement;
        divElement = document.createElement('div');
        divElement.className = "closeTab";
        divElement.appendChild(document.createTextNode('x'));
        liElement.appendChild(divElement);
        handleTab.append(liElement);

        var divElement;
        divElement = document.createElement('div');
        divElement.id = tabUniqueID;
        tabs.append(divElement);

        insertMultiplicationTableInfoInTab(formForMultiplicationTable, aElement, divElement); //calls the function that will add tab title and multiplicantion table content to tab

        tabs.tabs('refresh');

        var isIndex;
        isIndex = handleTab.find('li').length - 1;
        tabs.tabs("option", "active", isIndex);
    }

    var insertMultiplicationTableInfoInTab = function(formForMultiplicationTable, tabTitle, tabInfo) { // function responsible for adding the multiplication table content in tab
        var startingValueForMultiplier;
        startingValueForMultiplier = formForMultiplicationTable.elements['startingValueForMultiplier'].value;

        var endingValueForMultiplier;
        endingValueForMultiplier = formForMultiplicationTable.elements['endingValueForMultiplier'].value;

        var startingValueForMultiplicand;
        startingValueForMultiplicand = formForMultiplicationTable.elements['startingValueForMultiplicand'].value;

        var endingValueForMultiplicand;
        endingValueForMultiplicand = formForMultiplicationTable.elements['endingValueForMultiplicand'].value;

        var tabTitleInfo;
        tabTitleInfo = '[' + startingValueForMultiplier + ',' + endingValueForMultiplier + '] x [' + startingValueForMultiplicand + ',' + endingValueForMultiplicand + ']'; // this is what will is displayed as tab title

        tabTitle.innerHTML = tabTitleInfo;

        var multiplicationTable;
        multiplicationTable = createMultiplicationTable( startingValueForMultiplier, endingValueForMultiplier, startingValueForMultiplicand, endingValueForMultiplicand); // this is the multiplication table info that will be displayed in the tab content area

        $(tabInfo).empty();
        appendOrReplaceElement(multiplicationTable, tabInfo);
    }

    var updateCurrentTab = function(formForMultiplicationTable) { // function responsible for updating the current tab and I used https://stackoverflow.com/questions/21860658/how-to-set-active-tab-in-jquery-ui as a reference
        var currentTab;
        currentTab = tabs.tabs('option', 'active');

        if(currentTab !== false) {
            var tabHandle;
            tabHandle = handleTab.find('li').eq(currentTab);

            var tabTitle;
            tabTitle = tabHandle.find('a');

            var tabInfo;
            tabInfo = $(tabTitle.attr('href'));

            insertMultiplicationTableInfoInTab(formForMultiplicationTable, tabTitle[0], tabInfo[0]); // calls the function that will add multiplication table content in tab
            tabs.tabs('refresh');
        }
        else {
            makeTab(formForMultiplicationTable);
        }

    };

    return {
        initialize: initialize // exposes private function initialize as public
    };
})(); // () means that function is called and assigned the returned object instead of the function itself for the value of HandleFormForMultiplicationTable

// calls document's member function addEventListener() which takes arguments 'DOMContentLoaded' and
// HandleFormForMultiplicationTable's member initialize to initialize event listeners that depends on DOM
document.addEventListener('DOMContentLoaded', HandleFormForMultiplicationTable.initialize);
