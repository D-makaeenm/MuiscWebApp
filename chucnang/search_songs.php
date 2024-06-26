<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
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

// Kết nối đến cơ sở dữ liệu
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Kiểm tra kết nối
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Lấy query từ request
$query = isset($_GET['query']) ? $_GET['query'] : '';

// Chuẩn bị câu lệnh SQL để gọi stored procedure
$sql = "{CALL SearchSongs(?)}";

// Chuẩn bị và thực thi truy vấn
$params = [$query];
$stmt = sqlsrv_query($conn, $sql, $params);

// Kiểm tra kết quả
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Lấy dữ liệu từ truy vấn
$songs = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $songs[] = $row;
}

// Trả về kết quả dạng JSON
echo json_encode($songs);

// Đóng kết nối
sqlsrv_close($conn);
?>
