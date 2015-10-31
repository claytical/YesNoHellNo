var col = [];
var row = [];
var rowPrevious = [];
var easing;
var playing = true;
var current_values;
var finishLineY = 30;
var winner;
var players = ["Yes", "No", "Hell No!"];

function setup() {
  createCanvas(windowWidth, windowHeight); 
  col[0] = 100;
  col[1] = windowWidth/2;
  col[2] = windowWidth - 100;
  row[0] = windowHeight;
  row[1] = windowHeight;
  row[2] = windowHeight;
  rowPrevious[0] = windowHeight;
  rowPrevious[1] = windowHeight;
  rowPrevious[2] = windowHeight;

  easing = .025;
  setInterval(getValues, 1000);
}

function draw() {
  background(0);

  if (playing) {
    stroke(255);
    for (var x = 0; x < windowWidth; x+=5) {
      line(x, finishLineY, x + 2, finishLineY);
    }

    noStroke();
    var r = [];
    for (var i = 0; i < row.length; i++) {
      if (row[i] >= rowPrevious[i]) {
        r[i] = (rowPrevious[i] - row[i]) * easing;
        row[i] += r[i];
      }
      if (row[i] <= finishLineY) {
        playing = false;
        winner = whoWon();
      }
      textAlign(CENTER);
      textSize(24);
      text(players[i], col[i], row[i]);
//      ellipse(col[i], row[i], 30, 30);

    }
  }
  else {
    fill(255);
    textSize(48);
    textAlign(CENTER);
    switch(winner) {
      case 0:
        text("YES!", width/2, height/2);
        break;
      case 1:
        text("NO!", width/2, height/2);
        break;
      case 2:
        text("HELL NO!", width/2, height/2);
        break;
    }
  }
}

function whoWon() {
  var best = 9999;
  for (var i = 0; i < row.length; i++) {
    if(row[i] < best) {
      best = row[i];
      winnerIndex = i;
    }
  }
  return winnerIndex;
}

function getValues() {
  if (playing) {
    loadJSON('http://api.dataplayed.com/ynhn/counts.php?id=' + game_id, gotValues);
  }
}

function gotValues(data) {
  current_values = data;
  for (var i = 0; i < data.counts.length; i++) {
    if (row[i] >= rowPrevious[i]) {
      rowPrevious[i] = windowHeight - (data.counts[i] * 10);
    }

    if (data.counts[i] == 0) {
      row[i] = windowHeight;
      rowPrevious[i] = windowHeight;
    }
  }
}
function mousePressed() {
  playing = !playing;
}

