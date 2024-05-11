<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetDirectoryMP3 = 'D:/xampp/file/htdocs/WebMusic/mp3/';
    $targetDirectoryImage = 'D:/xampp/file/htdocs/WebMusic/image_path/';
    $targetFileMP3 = $targetDirectoryMP3 . basename($_FILES['file']['name']);
    $targetFileImage = $targetDirectoryImage . basename($_FILES['music_image']['name']);

    // Di chuyển tệp tải lên vào thư mục đích
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFileMP3) && move_uploaded_file($_FILES['music_image']['tmp_name'], $targetFileImage)) {
        // Lưu thông tin về bài hát vào cơ sở dữ liệu
        $music_name = $_POST['musicname'];
        $author = $_POST['author'];
        $userpost = $_POST['userpost'];
        // Khi tạo URL cho tên file, sử dụng rawurlencode()
        $music_path = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/mp3/' . rawurlencode(basename($_FILES['file']['name']));

        $image_path = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/image_path/' . basename($_FILES['music_image']['name']);
        $timestamp = $_POST['timestamp'];

        // Thực hiện kết nối tới cơ sở dữ liệu SQL Server
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

        // Chuẩn bị câu lệnh SQL
        $sql = "INSERT INTO baihat (ms_name, author, time_post, path_to_music, path_to_image, user_post) VALUES (?, ?, ?, ?, ?, ?)";
        $params = array($music_name, $author, $timestamp, $music_path, $image_path, $userpost);
        $stmt = sqlsrv_query($conn, $sql, $params);

        // Thực thi câu lệnh
        if ($stmt === false) {
            $response['success'] = false;
            $response['message'] = 'Có lỗi xảy ra khi xử lý yêu cầu: ' . print_r(sqlsrv_errors(), true);
        } else {
            $response['success'] = true;
            $response['message'] = 'done';
        }

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conn);

        // Trả về kết quả cho JavaScript
        echo json_encode($response);
    }
}

?>
    