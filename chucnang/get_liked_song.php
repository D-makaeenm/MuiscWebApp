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
if (isset($data['userId'])) {
    $userId = $data['userId'];

    // Gọi stored procedure
    $sql = "{CALL get_liked_song(?)}";
    $params = array($userId);

    $stmt = sqlsrv_query($conn, $sql, $params);

    // Kiểm tra lỗi khi gọi stored procedure
    if ($stmt === false) {
        $errors = sqlsrv_errors();
        die(json_encode(array("message" => "An error occurred.", "error" => $errors)));
    }

    // Đọc kết quả trả về từ stored procedure
    $likedSongs = array();
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        if ($row['DateAdded'] instanceof DateTime) {
            $row['DateAdded'] = $row['DateAdded']->format('Y-m-d');
        }
        $likedSongs[] = $row;
    }

    // Trả về danh sách bài hát đã thích
    echo json_encode($likedSongs);
} else {
    echo json_encode(array("message" => "Thiếu thông tin userId."));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
