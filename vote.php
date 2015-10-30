<?php

include 'connect.php';


//Check for all required values


$power = 1;
$answer = (int)$_GET['a'];
$game = (int)$_GET['g'];

if (is_numeric($_GET['power'])) {
    $power = $_GET['power'];
}

$database->insert('votes', [
    'game_id' => $game,
    'answer_id' => $answer,
    'power' => $power
    ]
);

$yes = $database->count('votes', [
        'answer_id' => '1'
        ]);

$no = $database->count('votes', [
        'answer_id' => '2'
        ]);

$hellno = $database->count('votes', [
        'answer_id' => '3'
        ]);

$return_array = array();

$return_array['counts'] = [$yes, $no, $hellno];
$return_array['query'] = [$answer, $game, $power];


echo json_encode($return_array);

?>