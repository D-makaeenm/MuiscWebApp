<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetDirectory = 'mp3/';
    $targetFile = $targetDirectory . basename($_FILES['file']['name']);
    
    // Di chuyển tệp tải lên vào thư mục đích (mp3/)
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo "Tệp " . basename($_FILES['file']['name']) . " đã được lưu thành công vào mp3/";
    } else {
        echo "Đã xảy ra lỗi khi lưu tệp vào thư mục mp3/";
    }
} else {
    echo "Yêu cầu không hợp lệ hoặc không có tệp được tải lên.";
}
?>
