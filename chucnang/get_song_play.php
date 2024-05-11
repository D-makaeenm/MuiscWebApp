<?php
// Kết nối đến cơ sở dữ liệu
$serverName = "DUYVPRO";
$connectionOptions = array(
    "Database" => "MusicApp",
    "Uid" => "sa",
    "PWD" => "makaeenm1"
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Kiểm tra kết nối
if (!$conn) {
    echo json_encode(array('success' => false, 'message' => 'Lỗi kết nối đến cơ sở dữ liệu.'));
    exit(); // Thoát chương trình
}

// Kiểm tra xem songId đã được gửi từ JavaScript hay không
if (!isset($_POST['songId'])) {
    echo json_encode(array('success' => false, 'message' => 'Không có ID bài hát được cung cấp.'));
    exit(); // Thoát chương trình
}

// Lấy songId từ yêu cầu POST
$songId = $_POST['songId'];

// Câu truy vấn SQL để lấy thông tin của bài hát dựa trên songId
$sql = "SELECT id, ms_name, author, path_to_music, path_to_image FROM baihat WHERE id = ?";
$params = array($songId);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    // Nếu có lỗi trong quá trình thực hiện câu truy vấn
    echo json_encode(array('success' => false, 'message' => 'Có lỗi xảy ra khi thực hiện truy vấn SQL.'));
    exit(); // Thoát chương trình
} else {
    // Lấy thông tin của bài hát từ kết quả truy vấn
    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    // Kiểm tra xem có bài hát nào được tìm thấy không
    if (!$row) {
        echo json_encode(array('success' => false, 'message' => 'Không tìm thấy bài hát với ID đã cung cấp.'));
        exit(); // Thoát chương trình
    }

    // Lưu thông tin của bài hát vào một mảng
    $song_info = array(
        'id' => $row['id'],
        'music_name' => $row['ms_name'],
        'author' => $row['author'],
        'music_path' => $row['path_to_music'],
        'image_path' => $row['path_to_image']
    );

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode(array('success' => true, 'song_info' => $song_info));
}

// Đóng kết nối đến cơ sở dữ liệu
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
