$(document).ready(function() {
    $('.lib_music').click(function(){
        var element = document.getElementById("mainpage");
        element.style.display = "none";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "block";
    });
    $('#music_posted_btn').click(function(){
        var element = document.getElementById("liked_music_container");
        element.style.display = "none";
        var element1 = document.getElementById("posted_music_container");
        element1.style.display = "block";
    });
    $('#music_liked_btn').click(function(){
        var element = document.getElementById("liked_music_container");
        element.style.display = "block";
        var element1 = document.getElementById("posted_music_container");
        element1.style.display = "none";
    });
    $('#btn_logo').click(function(){
        var element = document.getElementById("mainpage");
        element.style.display = "block";
        var element1 = document.getElementById("lib_page");
        element1.style.display = "none";
    });
    $('.post_music').click(function(){
        if(checklogin == 0){
            $.alert("Bạn cần đăng nhập để dùng chức năng này !");
        }else{
            upload();
        }
    });
});
