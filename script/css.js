var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");

// Hàm chuyển đến slide tiếp theo mỗi 5 giây
var slideshowInterval = setInterval(function() {
    plusSlides(1);
}, 5000);

// Hàm chuyển đến slide tiếp theo hoặc trước đó
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Hiển thị slide hiện tại và đổi vị trí của các slide
function showSlides(n) {
    var i;
    if (n >= slides.length) { slideIndex = 0; } // Quay lại slide đầu tiên nếu vượt quá số lượng slide
    if (n < 0) { slideIndex = slides.length - 1; } // Hiển thị slide cuối cùng nếu slide hiện tại là slide đầu tiên và ngược lại

    // Đặt vị trí slide hiện tại ở giữa
    slides[slideIndex].style.order = 2;

    // Đặt vị trí slide trước đó
    var prevSlideIndex = slideIndex - 1;
    if (prevSlideIndex < 0) { prevSlideIndex = slides.length - 1; }
    slides[prevSlideIndex].style.order = 1;

    // Đặt vị trí slide tiếp theo
    var nextSlideIndex = slideIndex + 1;
    if (nextSlideIndex >= slides.length) { nextSlideIndex = 0; }
    slides[nextSlideIndex].style.order = 3;
}

// Tạm dừng chuyển đổi tự động khi con trỏ chuột nhập vào khu vực slideshow
function pauseSlideshow() {
    clearInterval(slideshowInterval); // Dừng hàm setInterval
}

// Khởi động lại chuyển đổi tự động khi con trỏ chuột rời khỏi khu vực slideshow
function startSlideshow() {
    slideshowInterval = setInterval(function() {
        plusSlides(1); // Chuyển đến slide tiếp theo
    }, 5000); // Chuyển đổi mỗi 5 giây
}

// Bắt sự kiện khi trang được load
window.onload = function() {
    showSlides(slideIndex); // Hiển thị slide khi trang được load
};

// ------------------------------------------------------ play lít
