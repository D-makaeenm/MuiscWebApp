<?php
//thông tin về db cần cho kết nối
$serverName = "DUYVPRO";
$database = "MusicApp";
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
    die(print_r(sqlsrv_errors(), true));
}

// Lấy dữ liệu từ form
$tk =$_POST['tk'];
$mk =$_POST['mk'];
// Thực hiện truy vấn
$sql = "SELECT users, passwords FROM dangnhap WHERE users = ? AND passwords = ?";
$params = array($tk, $mk);
$kq = sqlsrv_query($conn, $sql, $params);
//chuỗi truy vấn trong sqlsrv_query(conn(là thông tin về db), sql(câu lệnh), params(mảng chứa dữ liệu))

if ($kq === false) {
    $response['success'] = false;
    $response['message'] = 'Có lỗi xảy ra khi xử lý yêu cầu.';
} else {
    // Kiểm tra số hàng trả về
    if (sqlsrv_has_rows($kq)) {
        $response['message'] = 'done';
    } else {
        $response['message'] = 'tk or mk wrong';
    }
}


// Trả về kết quả cho JavaScript
echo json_encode($response);

// Đóng kết nối
sqlsrv_close($conn);
?>
