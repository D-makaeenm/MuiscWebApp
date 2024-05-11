$(document).ready(function() {
    idsong = 0;
    $.ajax({
        url: 'chucnang/get_newest_songs.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                $('#row_newest').empty(); // Xóa nội dung của #row_newest
                var newestSongs = response.newest_songs;
                var displayLimit = 12;
                var rowHtml = ''; // Khởi tạo một biến để lưu HTML của hàng mới
                for (var i = 0; i < newestSongs.length && i < displayLimit; i++) {
                    var song = newestSongs[i];
                    var html = '<div class="col col_newest" data-song-id="' + song.id + '">'; // Thêm data-song-id vào div
                    html += '<div class="flex-container">';
                    html += '<div class="img_thmp">';
                    html += '<img class="img_thmp_in" src="' + song.image_path + '" alt="">';
                    html += '</div>';
                    html += '<div class="value_thmp">';
                    html += '<p>' + song.music_name + '</p>';
                    html += '<p>' + song.author + '</p>';
                    html += '<p>' + song.user_post + '</p>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    rowHtml += html; // Thêm phần tử vào hàng mới
                    // Kiểm tra nếu đã đến phần tử thứ 3 hoặc kết thúc mảng thì thêm hàng mới
                    if ((i + 1) % 3 === 0 || i === newestSongs.length - 1) {
                        $('#row_newest').append('<div class="row g-4">' + rowHtml + '</div>');
                        rowHtml = ''; // Đặt lại giá trị của rowHtml để chuẩn bị cho hàng mới
                    }
                }
                bindClickEvent(); // Gắn sự kiện click cho các phần tử mới
            } else {
                console.error(response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Đã xảy ra lỗi: ' + error);
        }
    });
});

function bindClickEvent() {
    $('.col_newest').click(function() {
        var songId = $(this).data('song-id'); // Lấy ID của bài hát từ data-song-id
        idsong = songId;
        // Gửi yêu cầu AJAX để lấy thông tin của bài hát dựa trên ID
        $.ajax({
            url: 'chucnang/get_song_play.php',
            type: 'POST',
            dataType: 'json',
            data: { songId: idsong },
            success: function(response) {
                if (response.success) {
                    // Thay đổi nội dung của bottom_bar dựa trên thông tin của bài hát
                    $('#img_thmp_in_bottom_bar').attr('src', response.song_info.image_path);
                    $('#tenbaihat').text(response.song_info.music_name);
                    $('#tacgia').text(response.song_info.author);
                    $('#audio1 source').attr('src', response.song_info.music_path);
                    $('#audio1')[0].load(); // Load lại audio sau khi thay đổi source
                } else {
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Đã xảy ra lỗi: ' + error);
            }
        });
    });
}
