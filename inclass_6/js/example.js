var list = document.getElementsByTagName('ul')[0];
// ADD NEW ITEM TO END OF LIST
var addNewItemLast = document.createElement('li');
var addNewTextLast = document.createTextNode('cream');
addNewItemLast.appendChild(addNewTextLast);
list.appendChild(addNewItemLast);

// ADD NEW ITEM START OF LIST
var addNewItemFirst = document.createElement('li');
var addNewTextFirst = document.createTextNode('kale');
addNewItemFirst.appendChild(addNewTextFirst);
list.insertBefore(addNewItemFirst, list.firstChild);

var listItems = document.querySelectorAll('li');

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var x;
for(x = 0; x < listItems.length; x++) {
    listItems[x].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var heading = document.querySelector('h2');
var headingText = heading.firstChild.nodeValue;
var totalItems = listItems.length;
var newHeading = headingText + '<span>' + totalItems + '</span>';
heading.innerHTML = newHeading;
