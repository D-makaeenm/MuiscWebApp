$(document).ready(function() {
    // Sử dụng AJAX để gửi yêu cầu lấy dữ liệu từ PHP
    $.ajax({
        url: 'chucnang/get_newest_songs.php', // Đường dẫn tới tệp PHP xử lý việc lấy dữ liệu từ cơ sở dữ liệu
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Xử lý dữ liệu nhận được từ phản hồi
            if (response.success) {
                // Xóa nội dung của phần tử có id là 'row_newest'
                $('#row_newest').empty();
                // Lấy danh sách các bài hát mới nhất từ phản hồi
                var newestSongs = response.newest_songs;
                // Chỉ hiển thị 12 bài hát mới nhất
                var displayLimit = 12;
                for (var i = 0; i < newestSongs.length && i < displayLimit; i++) {
                    var song = newestSongs[i];
                    var html = '<div class="col col_newest">';
                    html += '<div class="flex-container">';
                    html += '<div id="img_thmp">';
                    html += '<img id="img_thmp_in" src="' + song.image_path + '" alt="">';
                    html += '</div>';
                    html += '<div id="value_thmp">';
                    html += '<p>' + song.music_name + '</p>';
                    html += '<p>' + song.author + '</p>';
                    html += '<p>' + song.user_post + '</p>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    $('#row_newest').append(html);
                }
            } else {
                // Hiển thị thông báo nếu có lỗi khi lấy dữ liệu từ cơ sở dữ liệu
                console.error(response.message);
            }
        },
        error: function(xhr, status, error) {
            // Hiển thị thông báo nếu có lỗi trong quá trình gửi yêu cầu AJAX
            console.error('Đã xảy ra lỗi: ' + error);
        }
    });
});
