<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['topicImage'])) {
    $targetDirectoryImage = 'D:/xampp/file/htdocs/WebMusic/image_topic/';
    $targetFileImage = $targetDirectoryImage . basename($_FILES['topicImage']['name']);

    if (move_uploaded_file($_FILES['topicImage']['tmp_name'], $targetFileImage)) {
        $topicName = $_POST['topicName'];
        $imagePath = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/image_topic/' . rawurlencode(basename($_FILES['topicImage']['name']));

        $serverName = "DUYVPRO";
        $connectionOptions = array(
            "Database" => "WebMusic",
            "Uid" => "sa",
            "PWD" => "makaeenm1"
        );
        $conn = sqlsrv_connect($serverName, $connectionOptions);

        if ($conn === false) {
            echo json_encode(array('success' => '0', 'message' => 'Connection failed: ' . print_r(sqlsrv_errors(), true)));
            exit();
        }

        $sql = "{call add_topic(?, ?)}";
        $params = array($topicName, $imagePath);
        $stmt = sqlsrv_query($conn, $sql, $params);

        if ($stmt === false) {
            $response['success'] = '0';
            $response['message'] = 'Error: ' . print_r(sqlsrv_errors(), true);
        } else {
            $response['success'] = '1';
            $response['message'] = 'Topic added successfully';
            sqlsrv_free_stmt($stmt);
        }

        sqlsrv_close($conn);
        echo json_encode($response);
    } else {
        echo json_encode(array('success' => '0', 'message' => 'File upload failed.'));
    }
} else {
    echo json_encode(array('success' => '0', 'message' => 'Invalid request.'));
}
?>
