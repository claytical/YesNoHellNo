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

</head>

<body>

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
    </div>
  </div>

  <div id="play" style="display:none;">

  </div>

</body>
</html>