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
    echo json_encode(array('success' => '0', 'message' => 'Connection failed: ' . print_r(sqlsrv_errors(), true)));
    exit();
}

$sql = "{CALL get_topic}";

$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo json_encode(array('success' => '0', 'message' => 'Query execution failed: ' . print_r(sqlsrv_errors(), true)));
    exit();
}

$topics = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $topics[] = $row;
}

echo json_encode(array('success' => '1', 'topics' => $topics));

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
