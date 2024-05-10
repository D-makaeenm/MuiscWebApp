let slideIndexPlaylist = 0;
const totalSlides = document.querySelectorAll('.mySlides_playlist').length;

function plusSlidesPlaylist(n) {
    showSlidesPlaylist(slideIndexPlaylist += n);
}

function showSlidesPlaylist(n) {
    const slides = document.querySelectorAll('.mySlides_playlist');

    // Xử lý trường hợp quá giới hạn
    if (n >= totalSlides) { 
        slideIndexPlaylist = 0; 
    } else if (n < 0) { 
        slideIndexPlaylist = totalSlides - 1; 
    }

    // Đặt vị trí hiện tại của slide
    let currentIndex = (slideIndexPlaylist + totalSlides) % totalSlides;
    slides[currentIndex].style.order = 2;

    // Đặt vị trí của slide trước đó và slide tiếp theo
    let prevIndex = (slideIndexPlaylist - 1 + totalSlides) % totalSlides;
    let nextIndex = (slideIndexPlaylist + 1) % totalSlides;

    slides[prevIndex].style.order = 1;
    slides[nextIndex].style.order = 3;
}