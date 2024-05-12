// Kiểm tra xem mã đã được thực thi trước đó chưa trước khi thực hiện bất kỳ thao tác nào
if (!window.playlistInitialized) {
    window.playlistInitialized = true; // Đánh dấu rằng mã đã được thực thi
    
    // Bên trong khối này là đoạn mã JavaScript cần thực thi chỉ một lần

    document.addEventListener("DOMContentLoaded", function() {
        // Gửi yêu cầu AJAX để lấy thông tin nhạc từ PHP
        $.ajax({
            url: 'chucnang/get_newest_song_20.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    var newestSongs = response.newest_songs;
                    var contentContainer = document.getElementById("content_music_newest_container");

                    // Xóa nội dung hiện có trong contentContainer
                    contentContainer.innerHTML = '';

                    // Duyệt qua danh sách bài hát mới nhất và cập nhật các phần tử HTML
                    newestSongs.forEach(function(song) {
                        var musicContentDiv = document.createElement("div");
                        musicContentDiv.className = "content_music_newest";
                        musicContentDiv.dataset.pathToMusic = song.path_to_music;

                        // Tạo checkbox
                        var checkboxDiv = document.createElement("div");
                        checkboxDiv.className = "checkbox_music_content";
                        var checkboxInput = document.createElement("input");
                        checkboxInput.type = "checkbox";
                        checkboxInput.className = "pick_checkbox";
                        checkboxDiv.appendChild(checkboxInput);
                        musicContentDiv.appendChild(checkboxDiv);

                        // Tạo nội dung bài hát
                        var musicInfoDiv = document.createElement("div");
                        musicInfoDiv.id = "music_newest_name_content";
                        musicInfoDiv.innerHTML = '<div id="img_thmp_music_newest_content"><img id="img_thmp_in_music_newest_content" src="' + song.image_path + '" alt=""></div>' +
                            '<div id="value_thmp_music_newest_content"><p id="tenbaihat1">' + song.music_name + '</p><p id="tacgia1">' + song.author + '</p></div>';
                        musicContentDiv.appendChild(musicInfoDiv);

                        // Thêm các thông tin khác
                        var timePostDiv = document.createElement("div");
                        timePostDiv.id = "music_newest_time_post_content";
                        timePostDiv.textContent = song.time_post; // Chưa biết cột nào chứa thông tin về ngày đăng
                        musicContentDiv.appendChild(timePostDiv);

                        var userPostDiv = document.createElement("div");
                        userPostDiv.id = "music_newest_user_post_content";
                        userPostDiv.textContent = song.user_post;
                        musicContentDiv.appendChild(userPostDiv);
                        musicContentDiv.addEventListener("click", function() {
                            var element = document.getElementById("play_btn");
                            var element1 = document.getElementById("pause_btn");
                            element.style.display = "block";
                            element1.style.display = "none";
                            // Lấy thông tin bài hát
                            var bottomBarMusicName = document.getElementById("tenbaihat");
                            var bottomBarArtist = document.getElementById("tacgia");
                            var thumbnailImg = document.getElementById("img_thmp_in_bottom_bar");
                            var audioSource = document.getElementById("audio1").querySelector("source");
    
                            // Cập nhật thông tin bài hát trong bottom bar
                            bottomBarMusicName.textContent = song.music_name;
                            bottomBarArtist.textContent = song.author;
                            thumbnailImg.src = song.image_path;
    
                            // Cập nhật đường dẫn của file âm thanh để phát
                            audioSource.src = song.path_to_music;
    
                            // Cập nhật phần tử audio để load lại file âm thanh
                            var audioElement = document.getElementById("audio1");
                            audioElement.load();
                        });
                        contentContainer.appendChild(musicContentDiv);
                    });
                } else {
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Đã xảy ra lỗi: ' + error);
            }
        });
        

        $(document).on("change", ".pick_checkbox", function() {
            var anyChecked = $(".pick_checkbox:checked").length > 0;
            var element = document.getElementById('btn_add_playlist_newest_page');
            var element1 = document.getElementById('newest_text');
            if (anyChecked) {
                element.style.display = "block";
                element1.style.marginBottom = '30px';
            } else {
                element.style.display = "none";
                element1.style.marginBottom = '60px';
            }
        });

        $(document).on("click", "#btn_add_playlist_newest_page", function() {
            var selectedPlaylist = [];
            $.confirm({
                title: 'Chọn Playlist cần thêm!',
                content: `
                    <select id="dropdown">
                        <option value=""> </option> <!-- Tùy chọn mặc định với một ký tự trống -->
                        <option value="playlist1">Playlist 1</option>
                        <option value="playlist2">Playlist 2</option>
                        <option value="playlist3">Playlist 3</option>
                    </select><br>
                    <label id="playlist_selected"></label>
                `,
                buttons: {
                    formSubmit: {
                        text: 'Lưu',
                        btnClass: 'btn-blue',
                        action: function() {
                            console.log(selectedPlaylist);
                        }
                    },
                    rePick: {
                        text: 'Chọn lại',
                        btnClass: 'btn-yellow',
                        action: function() {
                            selectedPlaylist = [];
                            $('#playlist_selected').html(""); // Xóa hiển thị
                            return false;
                        }
                    },
                    cancel: function() {
                        // Đóng hộp thoại
                    },
                },
                onContentReady: function() {
                    $('#dropdown').on('change', function() {
                        var selectedValue = $(this).val();
                        if (selectedValue !== "" && !selectedPlaylist.includes(selectedValue)) {
                            selectedPlaylist.push(selectedValue);
                            $('#playlist_selected').html("Playlist đã chọn: " + selectedPlaylist.join(", "));
                        }
                    });
                }
            });
        });
    });
}
