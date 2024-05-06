<?php
// Thông tin về cơ sở dữ liệu
$serverName = "DUYVPRO";
$database = "MusicApp";
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

// Lấy dữ liệu từ form
$tk = $_POST['tk'];
$mk = $_POST['mk'];

// Thực hiện truy vấn
$sql = "SELECT username FROM dangnhap WHERE users = ? AND passwords = ?";
$params = array($tk, $mk);
$kq = sqlsrv_query($conn, $sql, $params);

// Kiểm tra kết quả truy vấn
if ($kq === false) {
    $response['success'] = false;
    $response['message'] = 'Có lỗi xảy ra khi xử lý yêu cầu.';
} else {
    // Kiểm tra số hàng trả về
    if (sqlsrv_has_rows($kq)) {
        // Lấy tên tài khoản từ kết quả truy vấn
        $row = sqlsrv_fetch_array($kq, SQLSRV_FETCH_ASSOC);
        $username = $row['username'];
        // Trả về tên tài khoản
        $response['success'] = true;
        $response['message'] = 'done';
        $response['username'] = utf8_encode($username);
    } else {
        $response['success'] = false;
        $response['message'] = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
    }
}

// Trả về kết quả dưới dạng JSON
echo json_encode($response);

// Đóng kết nối
sqlsrv_close($conn);
?>
