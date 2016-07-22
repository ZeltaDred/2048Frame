
// Enable the  new Game button
// This needs to be  moved to the control panel  and  linked in
// to monitoring "saved" events  to Local Storage

console.error("newGame.js  active ");

$("#new-game").click(function () {

  console.error(" New Game button ");

  localStorage.setItem("dz2048status", "Start new Game @ " + Math.floor(Date.now() / 10) );

});

