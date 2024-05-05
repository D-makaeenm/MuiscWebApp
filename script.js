$(document).ready(function() {
    $('#login').click(function() {
        login();
    });
    function login(){
        $.confirm({
            title: 'Đăng nhập',
            content:    `
            <form action="" class="form_name">
                <div class="form-group">
                    <label>Tài khoản</label>
                    <input type="text" placeholder="Tài khoản" class="tk form-control"/>
                    <label>Mật khẩu</label>
                    <input type="password" placeholder="Mật khẩu" class="mk form-control"/>
                </div>
            </form>`, 
            buttons: {
                formSubmit: {
                    text: 'Đăng nhập',
                    btnClass: 'btn-blue',
                    action: function () {
                        var tk = this.$content.find('.tk').val();
                        var mk = this.$content.find('.mk').val();
                        if (tk.trim() === '' || mk.trim() === '') {
                            $.alert('Vui lòng điền đầy đủ thông tin');
                            return false; // Ngăn chặn việc gửi form nếu thông tin không đầy đủ
                        }
                        $.ajax({
                            url: 'login.php',
                            method: 'POST',
                            data: {tk: tk, mk: mk},
                            success: function (response) {
                                var responseData = JSON.parse(response);
                                if (responseData.message === 'done') {
                                    $.alert('Đăng nhập thành công');
                                } else {
                                    $.alert('Đăng nhập thất bại');
                                }
                            },
                            
                            error: function () {
                                $.alert('Lỗi khi gửi yêu cầu đăng nhập');
                            }
                        });
                        
                    }
                },
                register: {
                    text: 'Đăng ký',
                    btnClass: 'btn-green',
                    action: function(){
                        register();
                    }
                },
                cancel: function () {
                    //close
                },
            }
        });
    }
    function register(){
        $.confirm({
            title: 'Đăng ký',
            content:    `
                <form action="" class="form_name">
                    <div class="form-group">
                        <label>Tài khoản</label>
                        <input type="text" placeholder="Tài khoản" class="tk form-control"/>
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="Mật khẩu" class="mk form-control"/>
                        <label>Tên hiển thị</label>
                        <input type="text" placeholder="Tên bạn muốn" class="name form-control"/>
                    </div>
                </form>`, 
            buttons: {
                formSubmit: {
                    text: 'Tạo',
                    btnClass: 'btn-green',
                    action: function () {
                        var tk = this.$content.find('.tk').val();
                        var mk = this.$content.find('.mk').val();
                        var name = this.$content.find('.name').val();
                        
                        // Kiểm tra xem tất cả các trường đều đã được điền đầy đủ
                        if (tk.trim() === '' || mk.trim() === '' || name.trim() === '') {
                            $.alert('Vui lòng điền đầy đủ thông tin');
                            return false; // Ngăn chặn việc gửi form nếu thông tin không đầy đủ
                        }
    
                        // Gửi dữ liệu đến register.php
                        $.ajax({
                            url: 'register.php',
                            method: 'POST',
                            data: {tk: tk, mk: mk, name: name},
                            success: function (response) {
                                if (response.message === 'ok') {
                                    $.alert('Đăng ký thành công');
                                } else if (response.message === 'not ok') {
                                    $.alert('Đăng ký thất bại');
                                }
                            },
                            error: function () {
                                $.alert('Lỗi khi gửi yêu cầu đăng ký');
                            }
                        });
                    }
                },
                cancel: function () {
                    // Đóng hộp thoại
                }
            }
        });
    }
    
});