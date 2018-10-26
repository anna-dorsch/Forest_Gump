console.log("Hello dear");

// Example
// - Output:
//    [
//      {score:42, name: 'A'},
//      {score:29, name: 'B'}
//    ]
function getHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores"));
  if (!Array.isArray(highScores)) {
    highScores = [];
  }
  console.log(highScores);
  return highScores;
}

//function to save the highscore locally
function saveHighScore(counter, name) {
  var highScores = getHighScores();
  highScores.push({ counter: counter, name: name });
  highScores.sort(function(a, b) {
    return b.counter - a.counter;
  });
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
// Example to render High Score
function renderHighScores() {
  var innerHTML = "<ul>";
  var highScores = getHighScores();
  for (var i = 0; i < highScores.length; i++) {
    innerHTML +=
      "<li>" + highScores[i].counter + " (" + highScores[i].name + ")</li>";
  }
  innerHTML += "</ul>";
  document.getElementById("high-scores").innerHTML = innerHTML;
  console.log(getHighScores);
}
