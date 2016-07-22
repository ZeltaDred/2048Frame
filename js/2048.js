var size = 4;
var board = {};
var score = 0;
var bestScore = 0;
var pName = "Guest";
var viewerWidth = 0;
var viewerHeight = 0;

var newColors = [];

// return a unique tile key base on grid location to support modifying attrubutes

var tileKey = function (col, row) {
  return "t" + pName + "-" + size + "-" + col + "-" + row;
};

// function to calculate board tile size based on the height and width of the  display window

var setTileSize = function(){

    viewerWidth = window.innerWidth - 20;
    viewerHeight = window.innerHeight - 20;

    var tileSize = 0;

    // Use smallest dimension of  width and hieght to determine tile size

    if (viewerHeight < viewerWidth)
    {
        tileSize = Math.floor(viewerHeight / (size + 1.5));
    } else
    {
        tileSize = Math.floor(viewerWidth / (size + 1.5));
    }

    // set the top margin for the board to approximately center it in the height available

    var $board = $("#board");
    $board.css("margin-top", (viewerHeight - (tileSize * size)) / 4 + "px")

    console.error(  "board top margin set to " +  (viewerHeight - (tileSize * size)) / 4)

    // reset the size attributes for all of the tiles

    for (var y = 0; y < size; y++) {
        for (var x = 0; x< size; x++){

            var key = tileKey(x, y);
            var $tile = $("#" + key);

            // set tile  height  and  width

            $tile.height(tileSize + "px");
            $tile.width(tileSize + "px");

            // set the  tile label font size and lline height to keep it centered

            $tile.css('line-height',tileSize + "px");
            $tile.css('font-size',tileSize/3 + "px");
        }
    }
};

// function to create a new board object --  a grid of tiles
// assign basic  classes to allow css control of display attributes

var createBoard = function () {
  var $board = $("#board").empty();
  for (var y = 0; y < size; y++) {
    var $row = $("<div></div>").addClass("row");
    $board.append($row);
    for (var x = 0; x < size; x++) {
      var $tile = $("<div></div>").addClass("tile");
      $tile.attr("id", tileKey(x, y));
      $row.append($tile);
    }
  }
};


//  dump tile attributes

var  dumpTileStuff = function () {

    console.error( "Trying to  dump element attributes");

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var key = tileKey(x, y);

              console.error( "Trying to  dump " + key + " attributes");

            var element = $("#" + key);

            $(element[0].attributes).each(function() {
            console.log(this.nodeName+':'+this.nodeValue);});
      }
    }
};


// Function to dump the  board for debugging issues
//


var dumpBoard = function(whichBoard){
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var key = tileKey(x, y);
          console.error( "key = " + key  +  "    New : " + whichBoard[key]);


      }
    }
}



// function to set text colors to contrast background
//

function getContrastYIQ(hexcolor){

    console.error(" hexcolor : " + hexcolor);

    var r = parseInt(hexcolor.substring(1,2),16);
    var g = parseInt(hexcolor.substring(3,2),16);
    var b = parseInt(hexcolor.substring(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    var textColor =  (yiq >= 128) ? 'black' : 'white';

//    console.error( "text color set to : " + textColor);

    return textColor;
}

// function to reset the game board colors
//

var changeColors = function () {

    newColors = randomColor({hue: 'blue', count: 18});

}

var setColors = function () {

    $(".tile").css("background-color", newColors[0]);
    $(".tile").css("color", getContrastYIQ(newColors[0]));

    $(".tile-undefined").css("background-color", newColors[0]);
    $(".tile-undefined").css("color", getContrastYIQ(newColors[0]));

    $(".tile-2").css("background-color", newColors[1]);
    $(".tile-2").css("color", getContrastYIQ(newColors[1]));

    $(".tile-4").css("background-color", newColors[2]);
    $(".tile-2").css("color", getContrastYIQ(newColors[2]));

    $(".tile-8").css("background-color", newColors[3]);
    $(".tile-8").css("color", getContrastYIQ(newColors[3]));

    $(".tile-16").css("background-color", newColors[4]);
    $(".tile-16").css("color", getContrastYIQ(newColors[4]));

    $(".tile-32").css("background-color", newColors[5]);
    $(".tile-32").css("color", getContrastYIQ(newColors[5]));

    $(".tile-64").css("background-color", newColors[6]);
    $(".tile-64").css("color", getContrastYIQ(newColors[6]));

    $(".tile-128").css("background-color", newColors[7]);
    $(".tile-128").css("color", getContrastYIQ(newColors[7]));

    $(".tile-256").css("background-color", newColors[8]);
    $(".tile-256").css("color", getContrastYIQ(newColors[8]));

    $(".tile-512").css("background-color", newColors[9]);
    $(".tile-512").css("color", getContrastYIQ(newColors[9]));

    $(".tile-1024").css("background-color", newColors[10]);
    $(".tile-1024").css("color", getContrastYIQ(newColors[10]));

    $(".tile-2048").css("background-color", newColors[11]);
    $(".tile-2048").css("color", getContrastYIQ(newColors[11]));

    $(".tile-4096").css("background-color", newColors[12]);
    $(".tile-4096").css("color", getContrastYIQ(newColors[12]));

    console.error (  " all tile colors css reset ");

//    dumpBoard(board);

};

//  This section added  to test the  effects of each move available
//  All 4 directions  are tested to see if the keypress results in a differnt board
//  2 directions are tested  to see which will rsult in the maximum score update

var showHints = function () {

  var leftScore = 0;
  var upScore = 0;

  var leftGood = false;
  var rightGood = false;
  var upGood = false;
  var dwnGood = false;

  var leftBoard = $.extend({}, board);

//  console.error("leftboard after duplication")
//  dumpBoard(leftBoard);

  for (var n = 0; n < size; n++) {

    var oldNumbersUp = getNumbersInRow(n);
    leftScore += testCombine(oldNumbersUp);
    var newNumbersLeft = testMove(oldNumbersUp);
    testNumbersInRow(leftBoard, n, newNumbersLeft);

  }
//  console.error("leftboard after score calcs")
//  dumpBoard(leftBoard);

  leftGood = checkMove(leftBoard);

//  console.error("leftBoard after move check")
//  dumpBoard(leftBoard);

  console.error( " left move works = " + leftGood )
  console.error(" left move : " + leftScore);


   var UpBoard = $.extend({}, board);
//  dumpBoard(board);
//  dumpBoard(UpBoard);

  for (var n = 0; n < size; n++) {

    var oldNumbersLeft = getNumbersInCol(n);
    upScore += testCombine(oldNumbersLeft);
    var newNumbersUp = testMove(oldNumbersLeft);
    testNumbersInRow(UpBoard,n,newNumbersUp);

  }

  upGood = checkMove(UpBoard);
//  dumpBoard(UpBoard);
  
  console.error(" Up move good  = " + upGood);
  console.error(" up move : " + upScore);

};

var testCombine = function (numbers) {
  var newNumbers = [];
  var testScore = 0;

  while (numbers.length > 0) {
    if (numbers[0] === numbers[1]) {
      testScore += numbers[0] + numbers[1];

      numbers.shift();
      numbers.shift();
    } else {
      numbers.shift();
    }
  }

  return testScore;
};

var testMove = function (numbers) {
  var newNumbers = [];

  while (numbers.length > 0) {
    if (numbers[0] === numbers[1]) {
      var sum = numbers[0] + numbers[1];
      newNumbers.push(sum);
      numbers.shift();
      numbers.shift();
    } else {
      newNumbers.push(numbers[0]);
      numbers.shift();
    }
  }

  while (newNumbers.length < size) {
    newNumbers.push(undefined);
  }

  return newNumbers;
};

var setBrdNumbersInCol = function (col, newNumbers, whichBoard) {
  for (var row = 0; row < size; row++) {
    var key = tileKey(col, row);
    whichBoard[key] = newNumbers[row];
  }
};

var setBrdNumbersInRow = function (row, newNumbers, whichBoard) {
  for (var col = 0; col < size; col++) {
    var key = tileKey(col, row);
    whichBoard[key] = newNumbers[col];
  }
};

var testNumbersInCol = function (whichBoard, col, newNumbers) {
  for (var row = 0; row < size; row++) {
    var key = tileKey(col, row);
    whichBoard[key] = newNumbers[row];
  }
};

var testNumbersInRow = function (whichBoard, row, newNumbers) {
  for (var col = 0; col < size; col++) {
    var key = tileKey(col, row);
    whichBoard[key] = newNumbers[col];
  }
};

var checkMove = function(whichboard){
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var key = tileKey(x, y);
      if (board[key] !== whichboard[key]) {
        console.error( "key = " + key  + " -  Old : " + board[key] + "    New : " + whichboard[key]);
        return true;
      }
    }
  }
  return false;

};


//  End  of analysis  sections...


//   Game  play
//

// RefreshBoard is the function that updates the board display
//

var refreshBoard = function () {

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var key = tileKey(x, y);
      var num = board[key];

//        console.error( "in rB : key : " + key + " is " + num + " size - " + tileSize);

      var $tile = $("#" + key);
      $tile.text("").removeClass().addClass("tile");
      $tile.text(num).addClass("tile-" + num);    

    }
  }

  setColors();

};

var getEmptyTiles = function () {
  var empty = [];
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var key = tileKey(x, y);
      var num = board[key];
      if (num === undefined) {
        empty.push(key);
      }
    }
  }
  return empty;
};

var addRandomTile = function () {
  var emptyTiles = getEmptyTiles();
  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  var randomEmptyTile = emptyTiles[randomIndex];

  if (Math.random() > 0.9) {
    board[randomEmptyTile] = 4;
  } else {
    board[randomEmptyTile] = 2;
  }
};

var combineNumbers = function (numbers) {
  var newNumbers = [];

  while (numbers.length > 0) {
    if (numbers[0] === numbers[1]) {
      var sum = numbers[0] + numbers[1];
      updateScore(sum);
      newNumbers.push(sum);
      numbers.shift();
      numbers.shift();
    } else {
      newNumbers.push(numbers[0]);
      numbers.shift();
    }
  }

  while (newNumbers.length < size) {
    newNumbers.push(undefined);
  }

  return newNumbers;
};

var getNumbersInCol = function (col) {
  var numbers = [];
  for (var row = 0; row < size; row++) {
    var key = tileKey(col, row);
    var val = board[key];
    if (val) {
      numbers.push(val);
    }
  }
  return numbers;
};

var getNumbersInRow = function (row) {
  var numbers = [];
  for (var col = 0; col < size; col++) {
    var key = tileKey(col, row);
    var val = board[key];
    if (val) {
      numbers.push(val);
    }
  }
  return numbers;
};

var setNumbersInCol = function (col, newNumbers) {
  for (var row = 0; row < size; row++) {
    var key = tileKey(col, row);
    board[key] = newNumbers[row];
  }
};

var setNumbersInRow = function (row, newNumbers) {
  for (var col = 0; col < size; col++) {
    var key = tileKey(col, row);
    board[key] = newNumbers[col];
  }
};

var combineColUp = function (col) {
  var oldNumbers = getNumbersInCol(col);
  var newNumbers = combineNumbers(oldNumbers);
  setNumbersInCol(col, newNumbers);
};

var combineColDown = function (col) {
  var oldNumbers = getNumbersInCol(col).reverse();
  var newNumbers = combineNumbers(oldNumbers).reverse();
  setNumbersInCol(col, newNumbers);
};

var combineRowLeft = function (row) {
  var oldNumbers = getNumbersInRow(row);
  var newNumbers = combineNumbers(oldNumbers);
  setNumbersInRow(row, newNumbers);
};

var combineRowRight = function (row) {
  var oldNumbers = getNumbersInRow(row).reverse();
  var newNumbers = combineNumbers(oldNumbers).reverse();
  setNumbersInRow(row, newNumbers);
};

var didBoardChange = function (oldBoard) {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var key = tileKey(x, y);
      if (board[key] !== oldBoard[key]) {
        return true;
      }
    }
  }
  return false;
};

var updateScore = function (increment) {
  score += increment;

  if (score > bestScore) {
    bestScore = score;
        console.error(" Updating  best score : "+ pName + "-" + size)
        localStorage.setItem("BS" + pName + "-" + size, bestScore);
  }
};

var keyPressed = function (direction) {
  var oldBoard = $.extend({}, board);

  for (var n = 0; n < size; n++) {
    if (direction == "left") {
      combineRowLeft(n);
    } else if (direction == "right") {
      combineRowRight(n);
    } else if (direction == "up") {
      combineColUp(n);
    } else if (direction == "down") {
      combineColDown(n);
    }
  }

  if (didBoardChange(oldBoard)) {
    addRandomTile();
    refreshBoard();
    saveData();
    if (checkGameOver()) {
      // show game over message
      $("<div></div>").appendTo("#board")
                      .attr("id", "game-over")
                      .text("Game over!")
                      .hide()
                      .fadeIn();
    }
  }
};

// Check  for  end of  game
// Need to check for no empty spaces first...  empty space means  "game on"
// If the board is full..  check to see if there are any valid moves..

var checkGameOver = function () {
  var empty = getEmptyTiles();
  if (empty.length > 0) {
    return false;
  }

  for (var row = 0; row < size; row++) {
    var numbers = getNumbersInRow(row);
    for (var n = 0; n < numbers.length - 1; n++) {
      // check for equal adjacent values
      if (numbers[n] === numbers[n+1]) {
        return false;
      }
    }
  }

  for (var col = 0; col < size; col++) {
    var numbers = getNumbersInCol(col);
    for (var n = 0; n < numbers.length - 1; n++) {
      // check for equal adjacent values
      if (numbers[n] === numbers[n+1]) {
        return false;
      }
    }
  }

  return true;
};

// Start new game function to enable  new game button press  any time


var startNewGame = function () {
  board = {};
  score = 0;
  changeColors();
    setTileSize();
  addRandomTile();
  addRandomTile();
  refreshBoard();
  saveData();
  $("#game-over").remove();
};

// Load  saved data  from Local Storage
// Keys include  player name and  board size so that
// History for multiple players  and board size histories can be maintained

var loadSavedData = function () {

    var currentGame = localStorage.getItem("dz2048status");
    if (currentGame){
//        if ( currentGame.substring(0,16) == "Start new Game @"){
            console.error(" 2048 loadSavedData : status : " + currentGame);
//        }
    }

    var oldPlayer = localStorage.getItem("dz2048who");
    if (oldPlayer){

        console.error(" 2048 loadSavedData : player : " + oldPlayer);
        pName = oldPlayer;

    }

    var oldSize = localStorage.getItem("dz2048size");
    if (oldSize){

        size = parseInt(oldSize);

    }

//  var savedScore = localStorage.getItem("CS" + pName + "-" + size);
////  if (savedScore) {
//    score = parseInt(savedScore, 10);
////  } else {
      localStorage.setItem("CS" + pName + "-" + size, 0);
      score = 0;
//  }

  var savedBestScore = localStorage.getItem("BS" + pName + "-" + size);
  if (savedBestScore) {
    bestScore = parseInt(savedBestScore, 10);
  } else {
    localStorage.setItem("BS" + pName + "-" + size, 0);
    bestScore = 0;
  }

//  var savedBoard = localStorage.getItem("brd-" + pName + "-" + size);
//  if (savedBoard) {
//    board = JSON.parse(savedBoard);

//      console.error("dumping  loaded  board  brd-"+ pName + "-" + size);
//      dumpBoard(board);

//    if (checkGameOver()) {
//             console.error("GameOver found  new Game -"+ pName + "-" + size);
//      startNewGame();
//    } else {
//      console.error("calling refresh -"+ pName + "-" + size);
//      refreshBoard();
//    }
//  } else {
           console.error("Load board failed..  staring new game for  -"+ pName + "-" + size);
      board = {};
      createBoard();
    startNewGame();
//  }
};

// Save  Data  to LocalStorage  with keys
// Keys  modified to provide unique  PlayerName and  size combos

var saveData = function () {
  console.error("2048.js  saveData  board, CurrentScore : " + pName + "-" + size)
  localStorage.setItem("brd-" + pName + "-" + size, JSON.stringify(board));
  localStorage.setItem("CS" + pName + "-" + size, score);

};

// add function to handle new game  button  press

var storeUpdate = function(event) {

    console.error("2048.js storage event from " + event.url );
    if (event.url == "qrc:/controls.html"){
        console.error(" new Game triggered.");

        var currentGame = localStorage.getItem("dz2048status");
        if (currentGame){
            if ( currentGame.substring(0,9) == "New Board"){
                console.error(" New Board request ");
                startNewGame();
            }

            if ( currentGame.substring(0,10) == "New Player"){
                console.error(" New Player request ");
                createBoard();
                startNewGame();
            }
        }

        loadSavedData();
    }

}

//  Add support  for de-bounced resize
//  This is a generic debounce  function,  using parameters for the function

function debounce(func, wait, immediate) {
    var timeout;
    console.error("func - debounce");
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//  Use the debounced  redraw function to call functions to recalc objects

var redraw = debounce(function() {

    setTileSize();
    changeColors();
    refreshBoard();

}, 250);

// Add a listener for the window resize event...
// debounce this call  so that it only happens  every  1/4 second

window.addEventListener('resize', redraw);

// Add a window listener  for  storage..
// New game  button  will store  name and size for game

window.addEventListener('storage', storeUpdate);

// First time entry  generates an empty board,
// then tries to load saved Data  if possible


console.error( " 2048.js   calling Creating board at  startup");
createBoard();

console.error( " 2048.js   calling Load SavedData at startup");
loadSavedData();

console.error( " 2048.js  calling redisplay board at startup");
refreshBoard();


// Enable the  kepressed event handler to monitor user input
// This version handles  arrow keys and VIM keyboard Characters


$(document).keydown(function (event) {
  switch (event.which) {
    case 65: // a
    case 37: // left arrow
      keyPressed("left");
      break;
    case 87: // w
    case 38: // up arrow
      keyPressed("up");
      break;
    case 68: // d
    case 39: // right arrow
      keyPressed("right");
      break;
    case 83: // s
    case 40: // down arrow
      keyPressed("down");
      break;
  }
});


