<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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
    die(json_encode(array("message" => "Connection failed.", "error" => sqlsrv_errors())));
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['chudeId'])) {
        $chudeId = $data['chudeId'];
        
        $sql = "{CALL deletechude(?)}";
        $params = array($chudeId);
        $stmt = sqlsrv_query($conn, $sql, $params);

        if ($stmt) {
            echo json_encode(array("success" => '1', "message" => "Chủ đề đã được xóa."));
        } else {
            echo json_encode(array("success" => '0', "message" => "Xóa chủ đề thất bại.", "error" => sqlsrv_errors()));
        }
    } else {
        echo json_encode(array("success" => '0', "message" => "Dữ liệu không hợp lệ."));
    }
} else {
    echo json_encode(array("success" => '0', "message" => "Phương thức không hợp lệ."));
}

sqlsrv_close($conn);
?>
