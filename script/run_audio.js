document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio1");
    var playButton = document.getElementById("play_btn");
    var pauseButton = document.getElementById("pause_btn");
    playButton.addEventListener("click", function(){
        audio.play();
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    });
    pauseButton.addEventListener("click", function(){
        audio.pause();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    });
});