
var easing;
var playing = true;
var current_values;
var finishLineY = 100;
var winner;
var question;
var bebas;
var answers = [];

function preload() {
  bebas = loadFont("fonts/BebasNeue.otf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(bebas); 
  answers.push(new Answer(100, "Yes!"));
  answers.push(new Answer(width/2, "No!"));
  answers.push(new Answer(width - 100, "Heck No!"));


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
    //FINISH LINE
    stroke(100);
    for (var x = 0; x < windowWidth; x+=5) {
      line(x, finishLineY, x + 2, finishLineY);
    }

    noStroke();
    for (var i = 0; i < answers.length; i++) {
      answers[i].move();
      answers[i].show();
      if (answers[i].winner) {
        winner = answers[i].answer;
        playing = false;
      }
    }
  }
  else {
    fill(255);
    textSize(48);
    textAlign(CENTER);
    text(winner, width/2, height/2);

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
    answers[i].jump(data.counts[i]);
  }
}

var Answer = function(column, answer) {
    this.x = column;
    this.y = height - 100;
    this.diameter = 30;
    this.py = height - 100;
    this.offset = 50;
    this.answer = answer;
    this.winner = false;
    this.burn = [];
    this.lastBurnY = this.y;
}

Answer.prototype.move = function() {
  if (this.y >= this.py) {
    var ey = (this.py - this.y) * easing;
    this.y += ey;
    this.burn.push(new Burn(this.x, this.py, this.offset + this.diameter));

  }

  if (this.y <= finishLineY) {
    this.winner = true;
  }
   
}

Answer.prototype.show = function() {
  for (var i = this.burn.length-1; i >= 0; i--) {
    var b = this.burn[i];
    b.show();
    b.fall();
    if (b.expired()) {
      this.burn.splice(i, 1);
    }
  }

  fill(200);
  noStroke();
  text(this.answer, this.x, this.y);
  noFill();
  strokeWeight(5);
  stroke(255);
  ellipse(this.x, this.y+this.offset, this.diameter, this.diameter);

}

Answer.prototype.jump = function(amount) {
  if(this.y >= this.py) {
    this.py = height - (amount * 10);
  }
  

  if (amount < 0) {
    this.y = height;
    this.py = height;
  }

}

var Burn = function(x, y, o) {
  this.width = random(1,5);
  this.height = random(2,5);
  this.offset = o;
  this.x = random(x - this.width, x + this.width);
  this.y = random(y - this.height, y + this.height);
  this.life = random(100, 200);
  this.speed = random(4,10);
}

Burn.prototype.show = function() {
  noStroke();
  fill(127, this.life);

  ellipse(this.x, this.y + this.offset, this.width, this.height);
}

Burn.prototype.fall = function() {
  this.y = this.y + this.speed;
  this.life--;
}

Burn.prototype.expired = function() {
  if (this.life < 0) {
    return true;
  }
  else {
    return false;
  }
}


