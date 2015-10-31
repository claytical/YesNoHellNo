<?php

include 'connect.php';

$game = $_GET['id'];

$yes = $database->count('votes', [
							 	"AND" => ["answer_id" => 1,
										  "game_id" => $game
								        ]
								]);

$no = $database->count('votes', [
							 	"AND" => ["answer_id" => 2,
										  "game_id" => $game
								        ]
						        ]);

$hellno = $database->count('votes', [
							 	"AND" => ["answer_id" => 3,
										  "game_id" => $game
								    	]
						        ]);

$return_array = array();

$return_array['counts'] = [$yes, $no, $hellno];
$return_array['query'] = [$answer, $game, $power];


echo json_encode($return_array);

?>