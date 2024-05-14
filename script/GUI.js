$(document).ready(function() {
    $('.lib_music').click(function(){
        var mainpage = document.getElementById("mainpage");
        mainpage.style.display = "none";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "block";
        var newest_page = document.getElementById("newest_page");
        newest_page.style.display = "none";
        var playlist_page = document.getElementById("playlist_page");
        playlist_page.style.display = "none";
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
        var mainpage = document.getElementById("mainpage");
        mainpage.style.display = "block";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "none";
        var newest_page = document.getElementById("newest_page");
        newest_page.style.display = "none";
        var playlist_page = document.getElementById("playlist_page");
        playlist_page.style.display = "none";
    });
    $('.post_music').click(function(){
        if(checklogin == 0){
            $.alert("Bạn cần đăng nhập để dùng chức năng này !");
        }else{
            upload();
        }
    });
    $('.newest_music').click(function(){
        var mainpage = document.getElementById("mainpage");
        mainpage.style.display = "none";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "none";
        var newest_page = document.getElementById("newest_page");
        newest_page.style.display = "block";
        var playlist_page = document.getElementById("playlist_page");
        playlist_page.style.display = "none";
    })
    $('.playlist_music').click(function(){
        var mainpage = document.getElementById("mainpage");
        mainpage.style.display = "none";
        var lib_page = document.getElementById("lib_page");
        lib_page.style.display = "none";
        var newest_page = document.getElementById("newest_page");
        newest_page.style.display = "none";
        var playlist_page = document.getElementById("playlist_page");
        playlist_page.style.display = "block";
    });
});
