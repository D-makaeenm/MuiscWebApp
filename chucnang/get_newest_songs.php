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
    die(print_r(sqlsrv_errors(), true));
}

// Câu truy vấn SQL để lấy danh sách bài hát mới nhất, giới hạn 12 bài hát
$sql = "SELECT TOP 12 ms_name, author, user_post, path_to_image FROM baihat ORDER BY time_post DESC";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    // Nếu có lỗi trong quá trình thực hiện câu truy vấn
    echo json_encode(array('success' => false, 'message' => 'Có lỗi xảy ra khi thực hiện truy vấn SQL.'));
} else {
    // Mảng để lưu trữ danh sách các bài hát mới nhất
    $newest_songs = array();

    // Lặp qua các bản ghi từ kết quả truy vấn
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        // Thêm thông tin của mỗi bài hát vào mảng
        $song_info = array(
            'music_name' => $row['ms_name'],
            'author' => $row['author'],
            'user_post' => $row['user_post'],
            'image_path' => $row['path_to_image']
            // Thêm các cột khác tùy theo cấu trúc của bảng trong cơ sở dữ liệu của bạn
        );

        // Thêm thông tin bài hát vào mảng chứa các bài hát mới nhất
        array_push($newest_songs, $song_info);
    }

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode(array('success' => true, 'newest_songs' => $newest_songs));
}

// Đóng kết nối đến cơ sở dữ liệu
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
