let slideIndexPlaylist = 0;
let totalSlides = document.querySelectorAll('.mySlides_playlist').length;

function plusSlidesPlaylist(n) {
    totalSlides = document.querySelectorAll('.mySlides_playlist').length; // Cập nhật lại số lượng slides khi có thay đổi
    showSlidesPlaylist(slideIndexPlaylist += n);
}

function showSlidesPlaylist(n) {
    const slides = document.querySelectorAll('.mySlides_playlist');

    // Đặt vị trí hiện tại của slide
    let currentIndex = (n + totalSlides) % totalSlides;
    slides[currentIndex].style.order = 2;

    // Đặt vị trí của slide trước đó và slide tiếp theo
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    let nextIndex = (currentIndex + 1) % totalSlides;

    // Thiết lập order cho slide trước đó và slide tiếp theo
    for (let i = 0; i < slides.length; i++) {
        if (i === prevIndex) {
            slides[i].style.order = 1;
        } else if (i === nextIndex) {
            slides[i].style.order = 3;
        } else {
            slides[i].style.order = 0; // Reset order của các slide khác
        }
    }
}
