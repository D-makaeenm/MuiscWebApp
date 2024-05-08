<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Player</title>
    <style>
        #seekBar {
            max-width: 300px;
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            height: 8px;
            border-radius: 5px;
            background: linear-gradient(to right,#fff 0%, #4b4094 100%);
            background-size: 100% 100%;
            outline: none;
            transition: background 0.2s;
        }

        #seekBar::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
        }

        #seekBar::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <audio id="audio1" controls>
        <source src="https://cdn.jsdelivr.net/gh/zenpho/tjs@master/musicForManateesLow.mp3">
    </audio>

    <input type="range" id="seekBar" min="0" value="0">

    <script>
        var audio = document.getElementById("audio1");
        var seekBar = document.getElementById("seekBar");

        audio.addEventListener("loadedmetadata", function() {
            seekBar.max = audio.duration;
        });

        seekBar.addEventListener("input", function() {
            audio.currentTime = seekBar.value;
        });

        audio.addEventListener("timeupdate", function() {
            seekBar.value = audio.currentTime;
            updateSeekBarBackground();
        });

        function updateSeekBarBackground() {
            var percent = (audio.currentTime / audio.duration) * 100;
            seekBar.style.background = "linear-gradient(to right, #9dc7b8 0%, #9dc7b8 " + percent + "%, #fff " + percent + "%, #4b4094 100%)";
        }
    </script>
</body>
</html>
