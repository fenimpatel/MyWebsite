/*
    File: https://fenimpatel.github.io/MyWebsite/assignment_9/js/hw9javascript.js
    COMP 4610 Assignment: Assignment 9 - Implementing a Bit of Scrabble with Drag-and-Drop
    Fenim Patel a Computer Science student at UMass Lowell in course COMP 4610 GUI Programming I
    Contact: fpatel@cs.uml.edu or fenim_patel@student.uml.edu
    Created: December 11, 2019 at 11:00 AM by Fenim Patel
    Copyright (c) 2019 by Fenim Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author
    Updated: December 21, 2019 at 11:00 PM by Fenim Patel
    Description: hw9javascript.js file is to implement a bit of scrabble with drag-and-drop using jQuery UI
*/

var WORDSCORE = 0; // global variable named WORDSCORE with a value of 0
var WORDLENGTH = 0; // global variable named WORDLENGTH with a value of 0
var LETTERPLACEDONRACK = []; // global variable named LETTERPLACEDONRACK that has value for letters
var SCRABBLELETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"; // global variable named SCRABBLELETTERS that has letters

$().ready(function() {
    createScrabbleBoard(); // function responsible for creating scrabble board is called
    createLetters(); // function responsible for creating letters is called
    useDragAndDrop(); // function responsible drag and drop is called

    // when reset scrabble game button is clicked, function responsible for reset scrabble game is called and function that handles drag and drop is called
    $("#resetScrabbleGame").click(function() {
        resetScrabbleGame();
        useDragAndDrop();
    });

    // when exchange letters button is clicked, function responsbile for exchange letters is called and function that handles drag and drop is called
    $("#exchangeLetters").click(function() {
        exchangeLetters();
        useDragAndDrop();
    });

    // when put letters back on rack button is clicked, function responsible for returning letter to rack is called and function that handles drag and drop is called
    $("#putLetterBackOnRack").click(function() {
        putLetterBackOnRack();
        useDragAndDrop();
    });

    // when clear scrabble board button is clicked, function responsible for clear scrabble board is called and function that handles drag and drop is called
    $("#clearScrabbleBoard").click(function() {
        clearScrabbleBoard();
        useDragAndDrop();
    });

    // when submit button is clicked, function responsible for submitting word is called and function that handles drag and drop is called
    $("#submit").click(function() {
        submitYourWord();
        useDragAndDrop();
    });
});

// function that creates letters
function createLetters() {
    var letters;
    letters = "";
    letters += '<table id="rackOfWord"><tr>';

    LETTERPLACEDONRACK = [];

    for(var x = 0; x < 7; x++) {
        var randomIndex;
        randomIndex = Math.floor(Math.random() * SCRABBLELETTERS.length); // recevies random index from SCRABBLELETTERS

        while(ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining === 0) { // loops until the letter is left and if not left then gets new letter
            randomIndex = Math.floor(Math.random() * SCRABBLELETTERS.length);
        }

        var letterLink = "images/scrabble/Scrabble_Letter_" + SCRABBLELETTERS[randomIndex] + ".png"; // access to letter location
        letters += "<td><img id='tile_drag_" + x + "' class='board_piece_" + SCRABBLELETTERS[randomIndex] + "' src='" + letterLink + "' /></img></td>";

        ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining = ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining - 1; // updates the remaining number
        LETTERPLACEDONRACK.push({"Letter": SCRABBLELETTERS[randomIndex], "id" : "tile_drag_" + x, "position": x, "value" : ScrabbleTiles[SCRABBLELETTERS[randomIndex]].value, "Link" : "<img id='tile_drag_" + x + "' class='board_piece_" + SCRABBLELETTERS[randomIndex] + "' src='" + letterLink + "' /></img>"});
    }

    letters += '</tr></table>';
    $("#score").html(WORDSCORE); // this will show score
    $("#rackOfLetters").html(letters); // this will show letters on rack
    changeLeftWord(); // function that changes left word is called
}

// function responsible for handling drag and drop feature
function useDragAndDrop() {
    doDrag();
    doDrop();
}

// function responsible for doing drag
function doDrag(string) {
    for(var x = 0; x < 7; x++) {
        $("#tile_drag_" + x).draggable( { // implementation of drag feature and I used https://downing.io/GUI/js/scrabble/draggable.js as a reference to help me
            revert: "invalid", // everything except the scrabble game board and the rack is invalid
            start: function(ev, ui) { // preserves the initial position
                startPos = ui.helper.position();
            },
            stop: function() { // if invalid event then draggable is returned to invalid option
                $(this).draggable('option', 'revert', 'invalid');
            }
        });
    }
}

// function responsible for doing drop
function doDrop() {
    $("#scrabbleBoardGame td").droppable( { // implementation of drop feature and I used http://jsfiddle.net/awsFU/ as a reference to help me
        accept: ".ui-draggable", // accepts ui-draggable as valid
        tolerance: 'intersect', // drag overlaps drop
        revert: "invalid",  // in order to make sure that you can drop
        drop: function(event, ui) {
            if($(this).attr('id') != undefined) { // to check for already letter exists and if it does then returns back to rack
                ui.draggable.draggable('option', 'revert', true);
                return;
            }
            else {
                $(this)[0].id = $(this)[0].id + " dropped";
                ui.draggable[0].style.cssText = "";

                var image;
                image = ui.draggable[0].outerHTML; // way to receive content that is dragged

                var stringID;
                stringID = String($(this)[0].id);

                var correct;
                correct = stringID.match(/(.+)(dropped)/);

                if(!isSpaceLetter(ui.draggable)) { // if not space letter then follow the steps to handle that scenario
                    var otherTD;
                    otherTD = '<td class="' + $(this)[0].className + '" id="' + correct[2] + '">' + image + '</td>';
                    $(this)[0].outerHTML = otherTD;
                }
                else { // if space letter then follow the steps to handle that scenario
                    var otherImage;
                    otherImage = changeSpaceLetter(ui.draggable);
                    var otherTD;
                    otherTD = '<td class="' + $(this)[0].className + '" id="' + correct[2] + '">' + otherImage + '</td>';
                    $(this)[0].outerHTML = otherTD;
                }

                ui.draggable[0].outerHTML = "";
                useDragAndDrop()
                getRidOfIDAfterDrag();
            }
        },
        out: function(event, ui) { // when letter is dragged to a different location from table do nothing
        }
    });
}

// function that resets the scrabble board game
function resetScrabbleGame() {
    var SCRABBLELETTERS;
    SCRABBLELETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

    for(var x = 0; x < SCRABBLELETTERS.length; x++) {
        ScrabbleTiles[SCRABBLELETTERS[x]].number_remaining = ScrabbleTiles[SCRABBLELETTERS[x]].original_distribution;
    }

    WORDSCORE = 0; // changes WORDSCORE to 0
    WORDLENGTH = 0; // changes WORDLENGTH to 0
    createScrabbleBoard(); // function that creates scrabble board game is called
    createLetters(); // function that creates letters is called
    changeLeftWord(); // function that changes left word is called
    $(".errorMessage").html("");
}

// function that exchanges the letters
function exchangeLetters() {
    var temp = $("#scrabbleBoardGame").find('td');
    temp.each(function() {
        if($(this)[0].id == "dropped") { // if id is dropped then empty it and then call the function that removes the id
            $(this)[0].innerHTML = "";
            getRidOfIDAfterDrag();
        }
    });

    for(var x = 0; x < LETTERPLACEDONRACK.length; x++) { // goes through LETTERPLACEDONRACK's element
        var letter;
        letter = LETTERPLACEDONRACK[x].Letter;
        ScrabbleTiles[letter].number_remaining += 1; // updates the remaining number
    }

    LETTERPLACEDONRACK = [];
    changeLeftWord(); // function that changes left word is called Recalculate the remainning word
    createLetters(); // function that creates letters is called
    useDragAndDrop(); // function that handles drag and drop is called
}

// function that puts letter back to rack
function putLetterBackOnRack() {
    var temp;
    temp = $("#scrabbleBoardGame").find('td'); // finds all td

    temp.each(function() { // goes through each td
        if(String($(this)[0].id) === "dropped") {
            $(this).removeAttr('id');
            $(this)[0].firstChild.outerHTML = "";
        }
    });

    updateLetters(); // function that updates letters is called
}

// function that clears the scrabble board game
function clearScrabbleBoard() {
    createScrabbleBoard(); // function that creates scrabble board game is called to create a new scrabble board game
    WORDLENGTH = 0; // changes WORDLENGTH's value to 0
}

// function to submit word
function submitYourWord() {
    var Word;
    Word = [];
    Word = receiveWordFromScrabbleBoard(); // receives letters from scrabble game board

    if(WORDLENGTH == Word.length) { // prints error message if there is no letter or no already placed word is there on scrabble game board
        var error;
        error = "ERROR: No Letter Or No Already Placed Word!";
        $(".errorMessage").html(error);
    }
    else { // if there is letter or already placed word then execute the statements in the else condition
        var scrabbleGameScore;
        scrabbleGameScore = receiveGameScore(Word); // receives score from word

        placeWordOnScrabbleBoard(Word); // makes the word valid
        receiveNewLetter();
        WORDSCORE += scrabbleGameScore; // changes the score of the scrabble board game
        WORDLENGTH = Word.length;
        $('#score').html(WORDSCORE); // this is to print the score
        Word = [];
    }
}

// function that changes left word
function changeLeftWord() {
    var left = "";
    $("#tilesOnHand").html(left);

    var numberOfLetterLeft = 0;

    for(var x = 0; x < SCRABBLELETTERS.length; x++) { // loops through to find the letters left
        numberOfLetterLeft += ScrabbleTiles[SCRABBLELETTERS[x]].number_remaining;
    }

    left += '<table class="leftword">';
    left += '<tr><td class="RowWord Left" colspan="9">Letter Left: ' + numberOfLetterLeft + '</td></td>'; // shows letters left
    left += '<tr><td class="RowWord">' + "A: " + ScrabbleTiles["A"].number_remaining + '</td>'; // shows A-to-I letters left
    left += '<td class="RowWord">' + "B: " + ScrabbleTiles["B"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "C: " + ScrabbleTiles["C"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "D: " + ScrabbleTiles["D"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "E: " + ScrabbleTiles["E"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "F: " + ScrabbleTiles["F"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "G: " + ScrabbleTiles["G"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "H: " + ScrabbleTiles["H"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "I: " + ScrabbleTiles["I"].number_remaining + '</td></td>';
    left += '<tr><td class="RowWord">' + "J: " + ScrabbleTiles["J"].number_remaining + '</td>'; // shows J-to-R letters left
    left += '<td class="RowWord">' + "K: " + ScrabbleTiles["K"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "L: " + ScrabbleTiles["L"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "M: " + ScrabbleTiles["M"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "N: " + ScrabbleTiles["N"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "O: " + ScrabbleTiles["O"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "P: " + ScrabbleTiles["P"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "Q: " + ScrabbleTiles["Q"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "R: " + ScrabbleTiles["R"].number_remaining + '</td></td>';
    left += '<tr><td class="RowWord">' + "S: " + ScrabbleTiles["S"].number_remaining + '</td>'; // shows S-to-Z then _ letters left
    left += '<td class="RowWord">' + "T: " + ScrabbleTiles["T"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "U: " + ScrabbleTiles["U"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "V: " + ScrabbleTiles["V"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "W: " + ScrabbleTiles["W"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "X: " + ScrabbleTiles["X"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "Y: " + ScrabbleTiles["Y"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "Z: " + ScrabbleTiles["Z"].number_remaining + '</td>';
    left += '<td class="RowWord">' + "_: " + ScrabbleTiles["_"].number_remaining + '</td></td>';
    left += '</table>';

    $("#tilesOnHand").html(left);
}

// function that checks if there is space letter
function isSpaceLetter($Space) {
    var getID;
    getID = $Space[0].className;

    var PresentLetter;
    PresentLetter = getID.match(/(board_piece_)(.)(.+)/);

    if(PresentLetter[2] != "_") { // checks if space letter is not present and returns false
        return false;
    }
    else { // checks if space letter is present and returns true
        return true;
    }
}

// function that changes space letter to a different letter
function changeSpaceLetter($spaceLetter) {
    var letter;
    letter = prompt("Please enter a letter from A-to-Z to replace the space [_] letter", "S"); // I used https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt as a reference to help me

    while(isAlphabet(letter) || String(letter).length > 1) { // loops until the value given by the user is a letter from A-to-Z or the input is not more than one character
        letter = prompt("Please enter a letter from A-to-Z to replace the space [_] letter", "S");
    }

    letter = letter.toUpperCase(); // changes the letter to upper case

    var text;
    text = $spaceLetter[0].outerHTML;

    var regularExpression;
    regularExpression = text.match(/(.+)(board_piece_)(.)(.+)(Scrabble_Letter_)(.)(.+)/);

    text = regularExpression[1] + regularExpression[2] + letter + regularExpression[4] + regularExpression[5] + letter + regularExpression[7]; // changes to a new letter

    return text;
}

// function removes id
function getRidOfIDAfterDrag() {
    var temp;
    temp = $("#scrabbleBoardGame").find('td'); // finds all td

    temp.each(function() { // goes through each td and removes id
        if($(this)[0].childElementCount == 0 && $(this)[0].id != "") {
            $(this).removeAttr('id');
        }
    });
}

 // function that checks if there is an alphabet
function isAlphabet(letter) {
    var temp;
    temp = String(letter);

    var resultingLetter;
    resultingLetter = temp.match(/([A-Za-z])+$/); // I used https://www.w3resource.com/javascript/form/all-letters-field.php to help me

    if(resultingLetter != null) { // if resulting letter is not equal to null then return false as it is not an alphabet
        return false;
    }
    else { // if resulting letter is equal to null then return true as it is an alphabet
        return true;
    }
}

// function that receives letter from rack
function receiveLetter($temp) {
    var imageID;
    imageID = $temp[0].firstChild.id;

    for(var x = 0; x < LETTERPLACEDONRACK.length; x++) { // goes through the letters on rack
        if(LETTERPLACEDONRACK[x].id == imageID) { // if letter is on rack then returns the letter on rack
            return LETTERPLACEDONRACK[x];
        }
    }
}

// functions that recevies new letter on rack
function receiveNewLetter() {
    var MissingLetters;
    MissingLetters = 7 - LETTERPLACEDONRACK.length;

    var temp;
    temp = [0, 0, 0, 0, 0 , 0, 0];

    var y;
    y = 0;

    for(var x = 0; x < 7; x++) {
        if(y < LETTERPLACEDONRACK.length) {
            if(LETTERPLACEDONRACK[y].position == x) {
                temp[x] = LETTERPLACEDONRACK[y];
                y++;
            }
        }
    }

    for(var x = 0; x < temp.length; x++) {
        if(temp[x] == 0) {
            var randomIndex;
            randomIndex = Math.floor(Math.random() * SCRABBLELETTERS.length); // recevies random index from SCRABBLELETTERS and I used https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array to help me
            while(ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining === 0) {
                randomIndex = Math.floor(Math.random() * SCRABBLELETTERS.length);
            }

            ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining = ScrabbleTiles[SCRABBLELETTERS[randomIndex]].number_remaining - 1; // changes the left value in ScrabbleTiles

            var letterLink;
            letterLink = "images/scrabble/Scrabble_Letter_" + SCRABBLELETTERS[randomIndex] + ".png"; // access to letter location

            temp[x] = ({"Letter": SCRABBLELETTERS[randomIndex], "id" : "tile_drag_" + x, "position": x, "value" : ScrabbleTiles[SCRABBLELETTERS[randomIndex]].value, "Link" : "<img id='tile_drag_" + x + "' class='board_piece_" + SCRABBLELETTERS[randomIndex] + "' src='" + letterLink + "' /></img>"});
        }
    }

    LETTERPLACEDONRACK = [];
    LETTERPLACEDONRACK = temp;
    updateLetters(); // function that updates letters is called
    changeLeftWord(); // function that updates the left word is called
}

// function that updates tiles
function updateLetters() {
    var letters;
    letters = "";
    letters += '<table id="rackOfWord"><tr>';

    var y;
    y = 0;

    temp = $("#rackOfLetters").find('td'); // finds all td

    for(var x = 0; x < temp.length; x++) { // goes through each td
        if(x >= LETTERPLACEDONRACK.length) { // if not in present rack then empty it
            letters += "<td></td>";
        }
        else { // otherwise add to tiles
            letters += "<td>" + LETTERPLACEDONRACK[y].Link + "</td>";
            y++;
        }
    }

    letters += '</tr></table>';
    $("#rackOfLetters").html(letters); // this will update rack of letters
}

// function that revmoves letter from rack
function getRidOfLetterFromRack(x) {
    var temp;
    temp = [];

    for(var y = 0; y < LETTERPLACEDONRACK.length; y++) { // goes through LETTERPLACEDONRACK's element
        if(y != x) {
            temp.push(LETTERPLACEDONRACK[y]); // pushes to temp
        }
    }

    LETTERPLACEDONRACK = [];
    LETTERPLACEDONRACK = temp;
}

// function that places word on scrabble game board
function placeWordOnScrabbleBoard($word) {
    var  temp;
    temp = $("#scrabbleBoardGame").find('td'); // finds all td

    temp.each(function() { // goes through each td
        if($(this)[0].id == "dropped") {
            var tempID;
            tempID = $(this)[0].firstChild.className;

            var PresentLetter;
            PresentLetter = tempID.match(/(board_piece_)(.)(.+)/);

            var randomIndex;
            randomIndex = String($(this)[0].firstChild.id).replace("tile_drag_", ""); // receives random index for LETTERPLACEDONRACK

            getRidOfLetterFromRack(randomIndex); // removes letter on rack for that random index
            $(this)[0].firstChild.id = "letterImageIsValid"; // validates the letter
            $(this)[0].firstChild.className = PresentLetter[2];
            $(this)[0].id = "valid"; // makes id to valid
        }
    });
}

// function that receives word from the scrabble board
function receiveWordFromScrabbleBoard() {
    var Word;
    Word = [];

    var temp;
    temp = $("#scrabbleBoardGame").find('td'); // finds all td

    temp.each(function() { // goes through each td
        if($(this)[0].childElementCount > 0 && ($(this)[0].id == "dropped" || $(this)[0].id == "valid")) {
            if($(this)[0].id != "dropped") {
                var string;
                string = String($(this).attr('class'));

                var temp2;
                temp2 = string.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);
                $temp = $(this);

                Word.push( { // pushes the letter, value, position, bonus square multiplier, and score
                    "Letter" : $(this)[0].firstChild.className,
                    "Value" : ScrabbleTiles[$(this)[0].firstChild.className].value,
                    "position" : temp2[3],
                    "times" : temp2[1],
                    "score" : 0
                });
            }
            else {
                var string;
                string = String($(this).attr('class'));

                var temp2;
                temp2 = string.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);
                temp = $(this);

                var letter;
                letter = receiveLetter(temp);

                if(letter.Letter == "_") { // handles if there is a space letter
                    var text;
                    text = $(this)[0].firstChild.className;

                    var regularExpression;
                    regularExpression = text.match(/(board_piece_)(.)(.+)/);
                    letter.Letter = regularExpression[2];
                    letter.Value = ScrabbleTiles[regularExpression[2]].value;
                }

                Word.push( { // pushes the letter, value, position, bonus square multiplier, and score
                    "Letter" : letter.Letter,
                    "Value" : letter.value,
                    "position" : temp2[3],
                    "times" : temp2[1],
                    "score" : 0
                });
            }
        }
    });

    return Word;
}

// function that handles the scrabble game score
function receiveGameScore($word) {
    var gameScore;
    gameScore = 0;

    for(var x = 0; x < $word.length; x++) {
        if(String($word[x].times) === "threeTimesTheLetter") { // if three times the value of letter bonus square multiplier then multiply letter by 3
            $word[x].score = parseInt($word[x].Value) * 3;
        }
        else if(String($word[x].times) === "twoTimesTheLetter") { // if two times the value of letter bonus square multiplier then multiply letter by 2
            $word[x].score = parseInt($word[x].Value) * 2;
        }
        else { // otherwise do not multiply letter by anything
            $word[x].score = parseInt($word[x].Value)
        }

        gameScore += $word[x].score; // add up the total score
    }

    for(var x = 0; x < $word.length; x++) {
        if(String($word[x].times) === "threeTimesTheWord") { // if three times the value of word bonus square multiplier then multiply word by 3
            gameScore = parseInt(gameScore) * 3;
        }
        else if(String($word[x].times) === "twoTimesTheWord") { // if two times the value of word bonus square multiplier then multiply word by 2
            gameScore = parseInt(gameScore) * 2;
        }
        else { // otherwise do not multiply word by anything
            gameScore = parseInt(gameScore);
        }
    }

    return gameScore; // game score is returned
}
