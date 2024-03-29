/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_9/js/scrabblePieces.js
    COMP 4610 Assignment: Assignment 9 - Implementing a Bit of Scrabble with Drag-and-Drop
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: December 11, 2019 at 1:00 PM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: December 21, 2019 at 11:00 PM by Fenim Patel
    Description: scrabblePieces.js file is to implement scrabble pieces as associative array and I used the associative array version of data structure
    which was created by Professor Heines which I got from the url https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
    to help me out
*/

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original_distribution" : 9,  "number_remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original_distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original_distribution" : 12, "number_remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original_distribution" : 3,  "number_remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original_distribution" : 9,  "number_remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original_distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original_distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original_distribution" : 8,  "number_remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original_distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original_distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original_distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original_distribution" : 2,  "number_remaining" : 2  } ;
