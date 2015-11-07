var col = [];
var row = [];
var rowPrevious = [];
var easing;
var playing = true;
var current_values;
var finishLineY = 100;
var winner;
var question;
var players = ["Yes", "No", "Hell No!"];
var bebas;

function preload() {
  bebas = loadFont("fonts/BebasNeue.otf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(bebas); 
  col[0] = 100;
  col[1] = windowWidth/2;
  col[2] = windowWidth - 100;
  for (var i = 0; i < col.length; i++) {
    row[i] = windowHeight - 100;
    rowPrevious[i] = windowHeight - 100;
  }

  easing = .025;
  setInterval(getValues, 1000);
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  if (question) {
    textSize(50);
    fill(255);
    text(question, width/2, 50);
  }

  textSize(20);

  if (playing) {
    stroke(100);
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
      fill(200);
      noStroke();
      text(players[i], col[i], row[i]);
      noFill();
      strokeWeight(5);
      stroke(255);
      ellipse(col[i], row[i]+50, 30, 30);

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
    loadJSON('counts.php?id=' + game_id, gotValues);
  }
}

function gotValues(data) {
  current_values = data;
  question = data.question;
  for (var i = 0; i < data.counts.length; i++) {
    if (row[i] >= rowPrevious[i]) {
      rowPrevious[i] = windowHeight - (data.counts[i] * 10);
    }

    if (data.counts[i] < 0) {
      row[i] = windowHeight;
      rowPrevious[i] = windowHeight;
    }
  }
}


