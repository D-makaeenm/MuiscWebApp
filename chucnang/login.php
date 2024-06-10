<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

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
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    $sql = "{CALL sessionlogin(?, ?)}";
    $params = array($username, $password);
    $stmt = sqlsrv_query($conn, $sql, $params);

    // Kiểm tra kết quả truy vấn
    if ($stmt === false) {
        $response['message'] = 'Lỗi khi thực thi stored procedure';
        $response['error'] = print_r(sqlsrv_errors(), true);
    } else {
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        if ($row) {
            $loginResult = $row['LoginResult'];
            $userId = $row['UserID'];
            if ($loginResult == 1) {
                $token = bin2hex(random_bytes(16));
                $_SESSION['username'] = $username; // Lưu tên người dùng vào session
                $response['message'] = '1';
                $response['username'] = $username;
                $response['userId'] = $userId;
            } elseif ($loginResult == 2) {
                $response['message'] = '2';
            } elseif ($loginResult == 0) {
                $response['message'] = '0';
            }
        } else {
            $response['message'] = 'Không có phản hồi từ stored procedure';
        }
    }
}

echo json_encode($response);

// Đóng kết nối
sqlsrv_close($conn);
?>
