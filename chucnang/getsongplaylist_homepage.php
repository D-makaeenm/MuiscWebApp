<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$serverName = "DUYVPRO";
$connectionOptions = array(
    "Database" => "WebMusic",
    "Uid" => "sa",
    "PWD" => "makaeenm1"
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$playlistId = isset($_GET['playlistId']) ? intval($_GET['playlistId']) : 0;

$songs = array();

$sql = "{call GetSongsInPlaylist_homepage(?)}";
$params = array($playlistId);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $songs[] = $row;
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

echo json_encode($songs);
?>
