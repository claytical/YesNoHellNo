<?php

include 'connect.php';
 
//Check for all required values

if ($_POST['question']) {
    
    $question = $_POST['question'];

    $game_id = $database->insert('game', [
                                            'question' => $question,
                                        ]
                                );
    header('Location: /ynhn/screen.php?id='.$game_id); 

}
else {
    echo "<h2>No Question Received</h2>";
}



?>