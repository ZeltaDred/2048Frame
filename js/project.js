
// Loop over local storage keys  and  append a paragraph  for each required
//  Display  who got  2048's
//  Display all the  BS  " best score" values

var redisplay = function() {

     $('body').empty();

    $('body').append("<h3>Hall of<br>Fame</h3>");

        localStorage.getItem("dz2048size");

    for ( var i = 0; i< localStorage.length; i++) {
        var testKey = localStorage.key(i).substring(0,2);
        if ( testKey == 'BS') {

//            $('body').append("<p> " + localStorage.key(i) +
//                         " : " + localStorage.getItem(localStorage.key(i)) + "</p>");

            $('body').append("<p> " + localStorage.key(i).substring(2, localStorage.key(i).length - 2) +
                             " : " + localStorage.getItem(localStorage.key(i)) + "</p>");
        }
    }
};


var storeUpdate = function(event) {

    console.error(" project.js storage event from " + event.url );
    if (event.url == "qrc:/2048.html"){
        console.error(" redisplay triggered");
        redisplay();
    }
}



window.addEventListener('storage', storeUpdate, false);

redisplay();
