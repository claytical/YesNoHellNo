<?php

include 'connect.php';


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