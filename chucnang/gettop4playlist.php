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

$playlists = array();

$sql = "{call Gettop4Playlist}";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $playlists[] = $row;
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

echo json_encode($playlists);
?>
