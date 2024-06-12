<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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

// Kiểm tra kết nối
if ($conn === false) {
    die(json_encode(array("message" => "Connection failed.", "error" => sqlsrv_errors())));
}

// Gọi stored procedure
$sql = "{CALL get20song_lastest}";

$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    $errors = sqlsrv_errors();
    die(json_encode(array("message" => "An error occurred.", "error" => $errors)));
}

$songs = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    if ($row['DatePosted'] instanceof DateTime) {
        $row['DatePosted'] = $row['DatePosted']->format('Y-m-d H:i:s');
    }
    $songs[] = $row;
}

echo json_encode($songs);

// Đóng kết nối
sqlsrv_close($conn);
?>
