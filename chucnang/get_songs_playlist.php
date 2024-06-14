<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Kết nối đến cơ sở dữ liệu
$serverName = "DUYVPRO";
$database = "WebMusic";
$uid = "sa";
$pass = "makaeenm1";
$connectionOptions = [
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pass
];

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$input = json_decode(file_get_contents('php://input'), true);
$playlistId = $input['playlistId'];

$sql = "{CALL GetsonginPlaylist(?)}";
$params = array(
    array($playlistId, SQLSRV_PARAM_IN)
);
$stmt = sqlsrv_query($conn, $sql, $params);

$playlists = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $row['DatePosted'] = date('Y-m-d', strtotime($row['DatePosted']->format('Y-m-d H:i:s')));
    $playlists[] = $row;
}

echo json_encode($playlists);

sqlsrv_close($conn);
?>
