<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

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
    die(json_encode(['error' => 'Failed to connect to database', 'details' => sqlsrv_errors()]));
}

$sql = "EXEC GetTop9LatestSongs";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    die(json_encode(['error' => 'Failed to execute stored procedure', 'details' => sqlsrv_errors()]));
}

$songs = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    // Xử lý trường DatePosted
    $row['DatePosted'] = date('Y-m-d', strtotime($row['DatePosted']->format('Y-m-d H:i:s')));
    $songs[] = $row;
}

sqlsrv_close($conn);

echo json_encode($songs);
?>
