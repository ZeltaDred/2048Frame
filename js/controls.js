//  2048 game Controls

        // Global vars to set game default values

var pName = "Guest";
var size = 4;

        // Global vars for the  display values

var score = 0;
var bestScore = 0;

        //  Add support  for de-bounced resize
        //  This is a generic debounce  function,  using parameters for the function

function debounce(func, wait, immediate) {
    var timeout;

    console.error("contol window resize - debounce active");

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

        // Update CSS properties based on window size to center objects

var setScale = function(){

    var newWinSize = window.innerHeight;

    $("#pname").css('line-height',newWinSize/4 + "px");
    $("#pname").css('font-size',newWinSize/4 + "px");

    $("#score").css('line-height',newWinSize/4 + "px");
    $("#score").css('font-size',newWinSize/4 + "px");

    $("#best-score").css('line-height',newWinSize/4 + "px");
    $("#best-score").css('font-size',newWinSize/4 + "px");

};

        //  Use the debounced  redraw function to Scale fonts

var redraw = debounce(function() {

    console.error( " [controls.js] - Font Rescale triggered")
    setScale();

}, 250);

        // Add a listener for the window resize event...

window.addEventListener('resize', redraw);

        // When we see  a  storage event from the new game button
        // Post the current player name and board size

var storeUpdate = function(event) {

    console.error(" controls.js got a storage event notice from " + event.url);

        // an event from LogoBlock means that the new Game button was pressed
    if ( event.url == "qrc:/LogoBlock.html") {


    //   we need to check to see if the  "rEsEt' code was passed
        if ($("#pname").val() == "rEsEt"){

            console.error(" [controls.js] -  rEsEt tiggered " );

                // load old  pname  to overwrite  Reset,  set  board size to 4

            var oldPlayer = localStorage.getItem("dz2048who");
            if (oldPlayer){

                pName = oldPlayer;
                $("#pname").val(pName);

            }

            document.boardSize.size.value="4";

            localStorage.clear();   // Clear all the localStorage values

            localStorage.setItem("dz2048who", pName);
            localStorage.setItem("dz2048size", 4);

        }  else {

            if ( $("#pname") ==  localStorage.getItem("dz2048who")  ){

                localStorage.setItem("dz2048status", "New Board" + Math.floor(Date.now() / 10) );

            }  else {

                console.error(" Storing who (" + $("#pname").val() +"), size, and  triggering  storage event");

                localStorage.setItem("dz2048status", "New Player" + Math.floor(Date.now() / 10) );
                localStorage.setItem("dz2048who", $("#pname").val());

                var bSize = document.getElementsByName('size');
                var bSize_value;
                for(var i = 0; i < bSize.length; i++){
                    if(bSize[i].checked){
                        bSize_value = bSize[i].value;
                    }
                }

                console.error( "Board size " + bSize);

                localStorage.setItem("dz2048size", bSize_value);
            }
        }
    }

    if ( event.url == "qrc:/2048.html") {
        console.error(" Loading  score data");

        loadSavedData();
    }

}

	
window.addEventListener('storage', storeUpdate, false);


// Load  saved data  from Local Storage
// Keys include  player name and  board size so that
// History for multiple players  and board size histories can be maintained

var loadSavedData = function () {

    var currentGame = localStorage.getItem("dz2048status");
    if (currentGame){

    }

    var oldPlayer = localStorage.getItem("dz2048who");
    if (oldPlayer){

        pName = oldPlayer;
        $("#pname").val(pName);

    }

    var oldSize = localStorage.getItem("dz2048size");
    if (oldSize){

        size = parseInt(oldSize);

    }


    var savedScore = localStorage.getItem("CS" + pName + "-" + size);
      if (savedScore) {
        score = parseInt(savedScore, 10);
      }

      var savedBestScore = localStorage.getItem("BS" + pName + "-" + size);
      if (savedBestScore) {
        bestScore = parseInt(savedBestScore, 10);
      }

      $("#score").text(score);
      $("#best-score").text(bestScore);

};

// console.error("Control js  active");

setScale();

loadSavedData();
