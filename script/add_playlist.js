var newSlide; // Định nghĩa biến newSlide ở mức global

function updateOrderAndIndex() {
    const slides = document.querySelectorAll('.mySlides_playlist');
    const newIndex = slides.length - 1; // Lấy index của phần tử mới thêm vào

    slides.forEach((slide, index) => {
        slide.style.order = index + 1;
    });
    
    // Tìm phần tử container với id là "gallery"
    var galleryContainer = document.getElementById("gallery_playlist");
    
    // Chèn phần tử div mới vào container tại vị trí cuối cùng
    galleryContainer.insertBefore(newSlide, galleryContainer.children[newIndex]);

    // Cập nhật lại slideIndexPlaylist
    slideIndexPlaylist = newIndex;
}

$(document).ready(function() {
    $('#add_playlist_btn').click(function(){
        // Tạo một phần tử div mới
        newSlide = document.createElement("div"); // Thay var thành let hoặc const không cần thiết
        newSlide.classList.add("mySlides_playlist");

        // Tạo một phần tử img bên trong phần tử div mới
        var newImg = document.createElement("img");
        newImg.setAttribute("src", "image/e0e5e9a36cf8d9d3c92957c339ce533b.jpg"); // Thay đổi đường dẫn hình ảnh của bạn
        newImg.setAttribute("id", "img_gal"); // Thêm id nếu cần thiết

        // Chèn phần tử img vào phần tử div mới

        var newName = document.createElement("p");
        var newNameText = document.createTextNode("playlistx");
        newName.appendChild(newNameText);

        newSlide.appendChild(newImg);
        newSlide.appendChild(newName);

        // Cập nhật lại thứ tự của các phần tử và slideIndexPlaylist
        updateOrderAndIndex();
    });
});
