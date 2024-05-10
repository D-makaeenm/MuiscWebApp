$(document).ready(function() {
    $('#add_playlist_btn').click(function(){
        // Tạo một phần tử div mới
        var newSlide = document.createElement("div");
        newSlide.classList.add("mySlides_playlist");

        // Tạo một phần tử img bên trong phần tử div mới
        var newImg = document.createElement("img");
        newImg.setAttribute("src", "image/e0e5e9a36cf8d9d3c92957c339ce533b.jpg"); // Thay đổi đường dẫn hình ảnh của bạn
        newImg.setAttribute("id", "img_gal"); // Thêm id nếu cần thiết

        // Chèn phần tử img vào phần tử div mới
        newSlide.appendChild(newImg);

        // Tìm phần tử container với id là "gallery"
        var galleryContainer = document.getElementById("gallery");

        // Chèn phần tử div mới vào container
        galleryContainer.appendChild(newSlide);
    });
});
