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

// Lấy dữ liệu từ request
$input = json_decode(file_get_contents('php://input'), true);
$chudeId = $input['chudeId'];

$sql = "{CALL Gettop3songbyChude(?)}";
$params = array(
    array($chudeId, SQLSRV_PARAM_IN)
);
$stmt = sqlsrv_query($conn, $sql, $params);

$songs = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $row['DatePosted'] = date('Y-m-d', strtotime($row['DatePosted']->format('Y-m-d')));
    $songs[] = $row;
}

echo json_encode(['success' => '1', 'songs' => $songs]);

sqlsrv_close($conn);