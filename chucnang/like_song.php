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

// Nhận dữ liệu JSON từ yêu cầu
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra xem dữ liệu có hợp lệ không
if (isset($data['userId']) && isset($data['BaiHatID'])) {
    $userId = $data['userId'];
    $songId = $data['BaiHatID'];

    // Gọi stored procedure
    $sql = "{CALL AddSongToLiked(?, ?)}";
    $params = array($userId, $songId);

    $stmt = sqlsrv_query($conn, $sql, $params);

    // Kiểm tra lỗi khi gọi stored procedure
    if ($stmt === false) {
        $errors = sqlsrv_errors();
        die(json_encode(array("message" => "An error occurred.", "error" => $errors)));
    }

    // Đọc kết quả trả về từ stored procedure
    $result = null;
    if (sqlsrv_fetch($stmt)) {
        $result = sqlsrv_get_field($stmt, 0);
    }

    // Kiểm tra kết quả của stored procedure
    if ($result === 1) {
        // Xử lý khi bài hát đã được thích trước đó
        echo json_encode(array("message" => "The song is already liked by this user."));
    } else {
        // Phản hồi thành công khi bài hát được thêm mới
        echo json_encode(array("message" => "Song liked successfully."));
    }
} else {
    echo json_encode(array("message" => "Thiếu thông tin userId hoặc BaiHatID."));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
