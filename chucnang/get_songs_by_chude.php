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

// Kiểm tra nếu ChuDeID tồn tại trong input
if (!isset($input['ChuDeID'])) {
    echo json_encode(['success' => '0', 'message' => 'ChuDeID is missing']);
    exit();
}

$chudeId = $input['ChuDeID'];

$sql = "{CALL GetsongbyChude(?)}";
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
?>
