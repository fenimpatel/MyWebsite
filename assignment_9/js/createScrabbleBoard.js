/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_9/js/createScrabbleBoard.js
    COMP 4610 Assignment: Assignment 9 - Implementing a Bit of Scrabble with Drag-and-Drop
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: December 11, 2019 at 11:00 AM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: December 21, 2019 at 11:00 PM by Fenim Patel
    Description: createScrabbleBoard.js file is to create the scrabble board for scrabble board game
*/

var scrabbleTable = "";
function createScrabbleBoard() { // function responsible for creating the scrabble board
	  $("#scrabbleBoardGame").html(scrabbleTable);
    scrabbleTable += '<table>';

  	var x;
		x = 1;

	  while(x < 9) { // loop runs so that scrabble board row will be displayed according to the cases in scrabbleBoardRow()
		    scrabbleBoardRow(x);
		    x++;
	  }

	  x = 7;

	  while(x > 0) { // loop runs so that scrabble board row will be displayed according to the cases in scrabbleBoardRow()
		    scrabbleBoardRow(x);
		    x--;
	  }

    scrabbleTable += '</table>';
    $("#scrabbleBoardGame").html(scrabbleTable);
	  scrabbleTable = "";

	  var temp;
		temp = $("#scrabbleBoardGame").find('td');

	  var length;
		length = temp.length;

	  var row;
		row = 1;

	  var column;
		column = 1;

	  temp.each(function() { // for making the scrabble board tile
		    var char;
				char = row.toString() + "-" + column.toString();
		    $(this).addClass(char);

		    if(column == 15) {
			      row++;
			      column = 0;
		    }

		    column++;
	  });
}

function scrabbleBoardRow(number) { // function responsible for rows of scrabble board with normal tiles and bonus square multiplier tiles
    switch(number) {
			  // case for having triple word title then two normal tile then double letter tile then three normal title then
				// triple word tile then three normal tile then double letter tile then two normal tile then triple word tile
        case 1:
				    scrabbleTable += '<tr><td class="threeTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheWord tile"></td>';
						break;

				// case for having normal tile then double word tile then three normal tile then triple letter tile then three
				// normal tile then triple letter tile then three normal tile then double word tile then one normal tile
        case 2:
				    scrabbleTable += '<tr><td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						break;

        // case for having two normal tile then double word tile then three normal tile then double letter tile then one
				// normal tile then double letter tile then three normal tile then double word tile then two normal tile
        case 3:
				    scrabbleTable += '<tr><td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						break;

        // case for having double letter tile then two normal tile the double word tile then three normal tile then
				// double letter tile then three normal tile then double word tile then two normal tile then double letter tile
				case 4:
				    scrabbleTable += '<tr><td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						break;

        // case for having four normal tile then double word tile then five normal tile then double word tile then four normal tile
				case 5:
				    scrabbleTable += '<tr><td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						break;

        // case for having one normal tile then triple letter tile then three normal tile then triple letter tile then three normal
				// tile then triple letter tile then three normal tile then triple letter tile then one normal tile
				case 6:
				    scrabbleTable += '<tr><td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						break;

        // case for having two normal tile then double letter tile then three normal tile then double letter tile then one normal
				// tile then double letter tile then three normal tile then double letter tile then two normal tile
				case 7:
				    scrabbleTable += '<tr><td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						break;

        // case for having triple word tile then two normal tile then double letter tile then three normal tile then star tile then
				// three normal tile then double letter tile then two normal tile then triple word tile
				case 8:
				    scrabbleTable += '<tr><td class="threeTimesTheWord tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="Star tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="twoTimesTheLetter tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="tile"></td>';
						scrabbleTable += '<td class="threeTimesTheWord tile"></td>';
						break;
	}
}
