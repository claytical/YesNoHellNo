<?php 
  include 'connect.php';
  $games = $database->select("game", [
                                      "id",
                                      "question"
                                      ]
                            );

if (!$_GET['select']) {
  $game_id = $database->max("game", "id");
}
else {
  $game_id = -1;
}
 
?>
<html>
<head>
  <meta charset="UTF-8">
  <script language="javascript" type="text/javascript" src="js/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="js/p5.dom.js"></script>
  <script language="javascript" type="text/javascript" src="js/play.js"></script>
  <!-- this line removes any default padding and style. you might only need one of these values set. -->
  <link rel="stylesheet" href="css/foundation.min.css" />
  <link rel="stylesheet" href="css/animate.css" />
  <script>
  var game_id = <?php echo $game_id;?>;
  </script>
</head>

<body>
<style>
.blockbutton:before {
  content: '';
  display: inline-block;
  height: 30%;
  vertical-align: middle;
  margin-right: -0.25em; /* Adjusts for spacing */
}

.bigblock {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 30%;
}
#defaultCanvas0 {
  display: none;
}

.scorebox {
  border: 1px solid black;
}
.score {
  font-style: italic;
}
.team {
  font-weight: bold;
}
</style>
  <div id="choose">
  <?php if($game_id == -1):?>
    <select name="game" id="game">
      <?php foreach($games as $game): ?>
        <option value=<?php echo $game['id']?>><?php echo $game['question']?></option>
      <?php endforeach;?>

    </select>
  <?php else:?>
    <select name="game" id="game" style="display:none;">
        <option value=<?php echo $game_id;?>></option>
    </select>
  <?php endif;?>
    <div id="choices">
      <div id="yesPseudo" class="blockbutton"/></div>

      <div id="noPseudo" class="blockbutton"/></div>

      <div id="hellNoPseudo" class="blockbutton"/></div>

    </div>
  </div>

  <div id="play" style="display:none;">

    <div id="counts" class="text-center">
      <div class="row">
        <div class="small-4 columns scorebox">
          <div class="score" id="yes">
          -
          </div>
          <div class="team">
            Yes
          </div>
        </div>
        <div class="small-4 columns scorebox">
          <div class="score" id="no">
          -
          </div>
          <div class="team">
            No</div>
          </div>
        <div class="small-4 columns scorebox">
          <div class="score" id="hellno">
          -
          </div>
          <div class="team">          
            Hell No
          </div>
        </div>
      </div>
    </div>

  </div>

</body>
</html>