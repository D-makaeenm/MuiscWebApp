function upload() {
    $.confirm({
        title: 'Upload nhạc!',
        content: '' +
            '<form id="uploadForm" enctype="multipart/form-data">' +
            '<input type="file" name="file" id="fileInput" accept=".mp3" required>' +
            `<label>Tên bài hát</label><input id="music_name" type="text" style="margin-left:10px; margin-top:10px;"/><br>` +
            `<label>Tác giả</label><input id="author" type="text" style="margin-left:10px; margin-top:10px;"/><br>` +
            `<label style="margin-left:10px; margin-top:10px;">Ảnh bài hát 160px x 160px</label>`+
            `<input style="margin-top:10px;" type="file" name="music_image" id="imageInput" accept="image/*" required>` +
            '</form>',
        buttons: {
            formSubmit: {
                text: 'Upload',
                btnClass: 'btn-blue',
                action: function () {
                    var fileInput = document.getElementById('fileInput');
                    if (!fileInput.files || !fileInput.files[0]) {
                        // Nếu không có file được chọn, hiển thị thông báo cảnh báo
                        $.alert('Bạn chưa chọn file.');
                        return false; // Ngăn chặn việc gửi form nếu không có file được chọn
                    }
                    var userpost = usr;
                    var formData = new FormData($('#uploadForm')[0]);
                    var musicname = this.$content.find('#music_name').val();
                    var author = this.$content.find('#author').val();
                    if (musicname.trim() === '' || author.trim() === '') {
                        $.alert('Vui lòng điền đầy đủ thông tin');
                        return false; // Ngăn chặn việc gửi form nếu thông tin không đầy đủ
                    }
                    formData.append('musicname', musicname);
                    formData.append('author', author);
                    formData.append('userpost', userpost); // Thêm userpost vào formData
                    var musicImageInput = document.getElementById('imageInput');
                    if (!musicImageInput.files || !musicImageInput.files[0]) {
                        $.alert('Bạn chưa chọn ảnh.');
                        return false;
                    }
                    formData.append('music_image', musicImageInput.files[0]); // Thêm ảnh vào formData

                    var currentTime = new Date();
                    formData.append('timestamp', currentTime.toISOString());
                    $.ajax({
                        url: 'chucnang/upload.php',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            // Parse response từ JSON
                            var responseData = JSON.parse(response);
                            if (responseData.success) {
                                // Nếu upload thành công, hiển thị thông báo thành công
                                $.alert('File đã được upload thành công!');
                            } else {
                                // Nếu upload không thành công, hiển thị thông báo lỗi từ server
                                $.alert('Lỗi: ' + responseData.message);
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            $.alert('Đã xảy ra lỗi trong quá trình upload file.');
                            console.error(xhr.responseText);
                        }
                    });
                }
            },
            cancel: function () {
                // Đóng hộp thoại
            },
        }
    });
}
