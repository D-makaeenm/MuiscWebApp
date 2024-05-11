$('.col_newest').click(function() {
    // Gắn sự kiện click cho các phần tử chứa thông tin bài hát
    $.alert('click' + idsong);
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
                $('#p1').text(response.song_info.music_name);
                $('#p2').text(response.song_info.author);
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
