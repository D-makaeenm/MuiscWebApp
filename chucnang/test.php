<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    $test = "Testing";
    echo json_encode($test);
?>