<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['songFile']) && isset($_FILES['songImage'])) {
    $targetDirectoryMP3 = 'D:/xampp/file/htdocs/WebMusic/mp3/';
    $targetDirectoryImage = 'D:/xampp/file/htdocs/WebMusic/image_path/';
    $targetFileMP3 = $targetDirectoryMP3 . basename($_FILES['songFile']['name']);
    $targetFileImage = $targetDirectoryImage . basename($_FILES['songImage']['name']);

    // Di chuyển tệp tải lên vào thư mục đích
    if (move_uploaded_file($_FILES['songFile']['tmp_name'], $targetFileMP3) && move_uploaded_file($_FILES['songImage']['tmp_name'], $targetFileImage)) {
        // Lưu thông tin về bài hát vào cơ sở dữ liệu
        $music_name = $_POST['songName'];
        $userId = $_POST['userId'];
        // Khi tạo URL cho tên file, sử dụng rawurlencode()
        $music_path = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/mp3/' . rawurlencode(basename($_FILES['songFile']['name']));
        $image_path = 'http://' . $_SERVER['HTTP_HOST'] . '/WebMusic/image_path/' . rawurlencode(basename($_FILES['songImage']['name']));

        // Thực hiện kết nối tới cơ sở dữ liệu SQL Server
        $serverName = "DUYVPRO";
        $connectionOptions = array(
            "Database" => "WebMusic",
            "Uid" => "sa",
            "PWD" => "makaeenm1"
        );
        $conn = sqlsrv_connect($serverName, $connectionOptions);

        // Kiểm tra kết nối
        if ($conn === false) {
            echo json_encode(array('success' => '0', 'message' => 'Connection failed: ' . print_r(sqlsrv_errors(), true)));
            exit();
        }

        // Chuẩn bị câu lệnh SQL
        $sql = "{call InsertBaiHat(?,?,?,?)}";
        $params = array($userId, $music_name, $music_path, $image_path);
        $stmt = sqlsrv_query($conn, $sql, $params);

        // Kiểm tra và thực thi câu lệnh
        if ($stmt === false) {
            $response['success'] = '0';
            $response['message'] = 'Có lỗi xảy ra khi xử lý yêu cầu: ' . print_r(sqlsrv_errors(), true);
        } else {
            // Kiểm tra kết quả trả về từ stored procedure
            $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
            if ($row['returnResult'] == 1) {
                $response['success'] = '1';
                $response['message'] = 'done';
            } else {
                $response['success'] = '0';
                $response['message'] = 'Có lỗi xảy ra khi chèn dữ liệu';
            }
            sqlsrv_free_stmt($stmt);
        }

        sqlsrv_close($conn);

        // Trả về kết quả cho JavaScript
        echo json_encode($response);
    } else {
        echo json_encode(array('success' => '0', 'message' => 'File upload failed.'));
    }
} else {
    echo json_encode(array('success' => '0', 'message' => 'Invalid request.'));
}
?>
