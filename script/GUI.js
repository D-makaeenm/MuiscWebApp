$(document).ready(function() {
    // $('.post_music').click(function() {
    //     if(checklogin == 1){
    //         $.confirm({
    //             title: 'Tải nhạc của bạn lên',
    //             content:    `
    //             <form action="" class="form_name">
    //                 <div class="form-group">
    //                     <label>Tên bài hát</label>
    //                     <input type="text" placeholder="Tài khoản" class="tk form-control"/>
    //                     <label>Tác giả</label>
    //                     <input type="password" placeholder="Mật khẩu" class="mk form-control"/>
    //                 </div>
    //             </form>`, 
    //             buttons: {
    //                 formSubmit: {
    //                     text: 'Tải',
    //                     btnClass: 'btn-blue',
    //                     action: function () {
    //                         var tk = this.$content.find('.tk').val();
    //                         var mk = this.$content.find('.mk').val();
    //                         if (tk.trim() === '' || mk.trim() === '') {
    //                             $.alert('Vui lòng điền đầy đủ thông tin');
    //                             return false; // Ngăn chặn việc gửi form nếu thông tin không đầy đủ
    //                         }
    //                         $.ajax({
    //                             url: 'chucnang/login.php',
    //                             method: 'POST',
    //                             data: {tk: tk, mk: mk}, 
    //                             success: function (response) {
    //                                 var responseData = JSON.parse(response);
    //                                 if (responseData.message === 'done') {
    //                                     $.ajax({
    //                                         url: 'chucnang/showUN.php',
    //                                         method: 'POST',
    //                                         data: {tk: tk, mk: mk},
    //                                         success: function(response){
    //                                             var responseData = JSON.parse(response);
    //                                             if (responseData.message === 'done'){
    //                                                 var username = responseData.username;
    //                                                 username = decodeURIComponent(JSON.parse('"' + username.replace(/\"/g, '\\"') + '"'));
    //                                                 showUN(username);
    //                                             }
    //                                         }
    //                                     });
    //                                     $.alert('Đăng nhập thành công');
    //                                     checklogin = 1;
    //                                 } else {
    //                                     $.alert('Đăng nhập thất bại');
    //                                 }
    //                             },
                                
    //                             error: function () {
    //                                 $.alert('Lỗi khi gửi yêu cầu đăng nhập');
    //                             }
    //                         });
                            
    //                     }
    //                 },
    //                 register: {
    //                     text: 'Đăng ký',
    //                     btnClass: 'btn-green',
    //                     action: function(){
    //                         register();
    //                     }
    //                 },
    //                 cancel: function () {
    //                     //close
    //                 },
    //             }
    //         });
    //     }
    // });
    
    $('.lib_music').click(function(){
        var element = document.getElementById("mainpage");
        element.style.display = "none";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "block";
    });
});
