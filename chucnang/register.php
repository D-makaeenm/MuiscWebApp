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
if (isset($data['username']) && isset($data['password']) && isset($data['email'])) {
    $tk = $data['username'];
    $mk  = $data['password'];
    $email = $data['email'];

    $sql = "{CALL register(?, ?, ?)}";
    $params = array($tk, $mk, $email);
    $stmt = sqlsrv_query($conn, $sql, $params);

    // Kiểm tra kết quả truy vấn
    if ($stmt === false) {
        $response['message'] = 'Đăng ký thất bại';
        $response['error'] = print_r(sqlsrv_errors(), true);
    } else {
        $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        if ($result) {
            $response['message'] = $result['Message'];
        } else {
            $response['message'] = 'Không có phản hồi từ stored procedure';
        }
    }
} else {
    $response['message'] = 'Dữ liệu không hợp lệ';
}
echo json_encode($response);

// Đóng kết nối
sqlsrv_close($conn);
?>
