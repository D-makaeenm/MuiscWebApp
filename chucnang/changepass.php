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
    $response = [
        'success' => false,
        'message' => 'Lỗi kết nối cơ sở dữ liệu',
        'error' => print_r(sqlsrv_errors(), true)
    ];
    echo json_encode($response);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['userId']) && isset($data['oldPassword']) && isset($data['newPassword'])) {
    $userId = $data['userId'];
    $oldPassword = $data['oldPassword'];
    $newPassword = $data['newPassword'];

    $sql = "{CALL changepassword(?, ?, ?)}";
    $params = array($userId, $oldPassword, $newPassword);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        $response = [
            'success' => false,
            'message' => 'Đổi mật khẩu thất bại',
            'error' => print_r(sqlsrv_errors(), true)
        ];
    } else {
        $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        if ($result) {
            $response = [
                'success' => $result['Result'] == 1,
                'message' => '1'
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Không có phản hồi từ stored procedure'
            ];
        }
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Dữ liệu không hợp lệ'
    ];
}

echo json_encode($response);
sqlsrv_close($conn);
?>
