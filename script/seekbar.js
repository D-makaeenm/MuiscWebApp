document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio1");
    var seekBar = document.getElementById("seekBar");
    var currentTimeText = document.getElementById("currentTime");
    var durationText = document.getElementById("duration");

    audio.addEventListener("loadedmetadata", function() {
        seekBar.max = audio.duration;
        durationText.textContent = formatTime(audio.duration);
    });

    seekBar.addEventListener("input", function() {
        audio.currentTime = seekBar.value;
    });

    audio.addEventListener("timeupdate", function() {
        seekBar.value = audio.currentTime;
        updateSeekBarBackground();
        currentTimeText.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("ended", function() {
        // Thực hiện các lệnh CSS mong muốn khi âm thanh kết thúc
        var element = document.getElementById("play_btn");
        element.style.display = "block";
        var element1 = document.getElementById("pause_btn");
        element1.style.display = "none";
    });

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return pad(minutes) + ":" + pad(seconds);
    }

    function pad(number) {
        return (number < 10 ? "0" : "") + number;
    }

    function updateSeekBarBackground() {
        var percent = (audio.currentTime / audio.duration) * 100;
        seekBar.style.background = "linear-gradient(to right, #9dc7b8 0%, #9dc7b8 " + percent + "%, #fff " + percent + "%, #4b4094 100%)";
    }
});
