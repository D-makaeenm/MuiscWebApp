<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['playlistImage'])) {
    $targetDirectoryImage = 'D:/xampp/file/htdocs/WebMusic/image_playlist/';
    $targetFileImage = $targetDirectoryImage . basename($_FILES['playlistImage']['name']);

    if (move_uploaded_file($_FILES['playlistImage']['tmp_name'], $targetFileImage)) {
        $playlistName = $_POST['playlistName'];
        $userId = $_POST['userId'];
        $imagePath = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/image_playlist/' . rawurlencode(basename($_FILES['playlistImage']['name']));

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

        $sql = "{call add_playlists(?, ?, ?)}";
        $params = array($userId, $playlistName, $imagePath);
        $stmt = sqlsrv_query($conn, $sql, $params);

        if ($stmt === false) {
            $response['success'] = '0';
            $response['message'] = 'Error: ' . print_r(sqlsrv_errors(), true);
        } else {
            $response['success'] = '1';
            $response['message'] = 'Playlist added successfully';
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