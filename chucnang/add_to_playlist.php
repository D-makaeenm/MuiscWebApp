<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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
if (isset($data['BaiHatID']) && isset($data['PlaylistIDs'])) {
    $songId = $data['BaiHatID'];
    $playlistIds = explode(',', $data['PlaylistIDs']); // Chuyển chuỗi thành mảng

    // Chuẩn bị các tham số cho stored procedure
    $playlistIdsString = implode(',', $playlistIds);
    $sql = "{CALL AddSongToPlaylists(?, ?)}";
    $params = array($songId, $playlistIdsString);
    $stmt = sqlsrv_query($conn, $sql, $params);

    // Kiểm tra lỗi khi gọi stored procedure
    if ($stmt === false) {
        die(json_encode(array("message" => "An error occurred.", "error" => sqlsrv_errors())));
    }

    // Phản hồi thành công
    echo json_encode(array("message" => "Song added to playlists successfully."));
} else {
    echo json_encode(array("message" => "Missing BaiHatID or PlaylistIDs."));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
