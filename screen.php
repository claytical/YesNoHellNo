<?php 
	$game_id = 0;
	if ($_GET['id']) {
		$game_id = $_GET['id'];
	}
?>
<html>
<head>
  <meta charset="UTF-8">
  <script>
  var game_id = <?php echo $game_id;?>;
  </script>
  <script language="javascript" type="text/javascript" src="js/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="js/p5.dom.js"></script>
  <script language="javascript" type="text/javascript" src="js/sketch.js"></script>
  <style> body {padding: 0; margin: 0;} </style>
</head>

<body>

</body>
</html>