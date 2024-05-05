<?php
// Kết nối đến cơ sở dữ liệu
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
$name = $_POST['name'];

// Thực hiện truy vấn
$sql = "INSERT INTO dangnhap (users, passwords, username) VALUES (?, ?, ?)";
$params = array($tk, $mk, $name);
$stmt = sqlsrv_query($conn, $sql, $params);

// Kiểm tra kết quả truy vấn
if ($stmt === false) {
    // Đăng ký thất bại
    $response['message'] = 'not ok';
} else {
    // Đăng ký thành công
    $response['message'] = 'ok';
}

// Trả về kết quả cho JavaScript
echo json_encode($response);

// Đóng kết nối
sqlsrv_close($conn);
?>
