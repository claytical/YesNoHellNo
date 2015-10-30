var yesButton;
var noButton;
var hellNoButton;
var a;
var answer_id = 0;
var game_id = 0;

function setup() {
  yesButton = createA("#", "Yes!");
  noButton = createA("#", "No!");
  hellNoButton = createA("#", "HELL NO!");

  yesButton.parent('choices');
  yesButton.class('button expand');
  yesButton.mousePressed(sayYes);

  noButton.parent('choices');
  noButton.class('button expand');
  noButton.mousePressed(sayNo);

  hellNoButton.parent('choices');
  hellNoButton.class('button expand');
  hellNoButton.mousePressed(sayHellNo);
}

function draw() {

}

function getValues() {
  if (playing) {
    loadJSON('http://api.dataplayed.com/ynhn/counts.php?id=' + game_id, gotValues);
  }
}

function sayYes() {
  a = createA('#', "YES!");
  startGame(1);
}

function sayNo() {
  a = createA('#', "NO!");
  startGame(2);
}

function sayHellNo() {
  a = createA('#', "HELL NO!");
  startGame(3);
}

function startGame(answer) {
  answer_id = answer;
  a.class('button expand');
  var choose = select('#choose');
  choose.hide();
  a.parent('play');
  var p = select('#play');
  p.show();
  a.mousePressed(sendAnswer);

  var game_options = select('#game');
  game_id = game_options.value();

}

function gotValues(data) {
  console.log(data);
}

function sendAnswer() {
  console.log("sending answer:" + game_id + "," + answer_id);

  loadJSON('http://api.dataplayed.com/ynhn/vote.php?g='+game_id+'&a='+answer_id, gotValues);
}