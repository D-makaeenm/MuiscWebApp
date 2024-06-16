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

$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET') {
    // Gọi stored procedure để lấy dữ liệu feedback
    $sql = "{CALL showfeedback()}";
    $stmt = sqlsrv_query($conn, $sql);

    if ($stmt === false) {
        die(json_encode(array("message" => "Failed to retrieve feedbacks.", "error" => sqlsrv_errors())));
    }

    $feedbacks = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $feedbacks[] = $row;
    }

    echo json_encode(array("message" => "ok", "feedbacks" => $feedbacks));
} elseif ($requestMethod == 'POST') {
    // Nhận dữ liệu JSON từ yêu cầu
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem dữ liệu có hợp lệ không
    if (isset($data['userId']) && isset($data['feedbackType']) && isset($data['description'])) {
        $userId = $data['userId'];
        $feedbackType = $data['feedbackType'];
        $description = $data['description'];

        // Gọi stored procedure để thêm phản hồi
        $sql = "{CALL getfeedback(?, ?, ?)}";
        $params = array($userId, $feedbackType, $description);
        $stmt = sqlsrv_query($conn, $sql, $params);

        // Kiểm tra lỗi khi gọi stored procedure
        if ($stmt === false) {
            $errors = sqlsrv_errors();
            die(json_encode(array("message" => "An error occurred.", "error" => $errors)));
        }

        // Phản hồi thành công
        echo json_encode(array("message" => "ok"));
    } else {
        echo json_encode(array("message" => "notok"));
    }
}

// Đóng kết nối
sqlsrv_close($conn);
?>
