// Lấy tất cả các phần tử div có class là "myDiv"
var divs = document.querySelectorAll('.col_newest');

// Lặp qua từng phần tử div và thêm sự kiện click
divs.forEach(function(div) {
    div.addEventListener('click', function() {
        // Xử lý khi div được click
        $.alert("Div clicked: " + div.textContent);
    });
});