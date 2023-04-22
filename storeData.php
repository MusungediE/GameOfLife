<?php
    session_start();
    $post = json_decode(file_get_contents('php://input'), true);
    $newData = "";
    $newData .= $_SESSION['username'];
    $newData .= ",";
    $newData .= $post['dataT']." seconds";
    $newData .= ",";
    $newData .= $post['dataS']." points";

    $previousData = file("data.txt", FILE_IGNORE_NEW_LINES);
    $previousArray = array();

    $flag = false;
    foreach($previousData as $singleLine) {
        array_push($previousArray, explode(",", $singleLine));
    }
    for($i=0; $i < count($previousArray); $i++) {
        if($previousArray[$i][0] == $_SESSION['username']) {
            $flag = true;
            $previousArray[$i] = explode(",", $newData);
            break;
        }
    }
    if($flag == false) {
        array_push($previousArray, explode(",", $newData));
    }
    $data = "";
            foreach ($previousArray as $currentArray) {
                $newEntry = "";
                $newEntry .= $currentArray[0];
                $newEntry .= ",";
                $newEntry .= $currentArray[1];
                $newEntry .= ",";
                $newEntry .= $currentArray[2];
                $data .= "$newEntry\n";
            }
            file_put_contents("data.txt", $data, FILE_USE_INCLUDE_PATH);
    //file_put_contents("data.txt", $test, FILE_USE_INCLUDE_PATH);
    
?>
