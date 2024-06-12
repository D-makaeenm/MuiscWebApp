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

// Kết nối đến cơ sở dữ liệu
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Kiểm tra kết nối
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Nhận dữ liệu JSON từ yêu cầu
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra xem dữ liệu có hợp lệ không
if (isset($data['userId'])) {
    $userId = $data['userId'];
    $sql = "{CALL selectbaihatcuauser(?)}";
    $params = array($userId);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    // Chuyển đổi kết quả thành mảng JSON
    $response = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        // Chuyển đổi DatePosted thành định dạng Y-m-d
        if ($row['DatePosted'] instanceof DateTime) {
            $row['DatePosted'] = $row['DatePosted']->format('Y-m-d');
        }
        $response[] = $row;
    }

    echo json_encode($response);
} else {
    echo json_encode(array("message" => "Thiếu thông tin userId."));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
