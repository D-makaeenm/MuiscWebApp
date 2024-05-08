<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Volume Control</title>
</head>
<body>
    <label>
        Volume
        <input type="range" id="slider1" min="0" max="100" value="100">
        <span id="display1"></span>
    </label>

    <audio id="audio1" controls>
        <source src="https://cdn.jsdelivr.net/gh/zenpho/tjs@master/musicForManateesLow.mp3">
    </audio>

    <script>
        var audio1 = document.getElementById("audio1");
        var slider1 = document.getElementById("slider1");
        var display1 = document.getElementById("display1");

        slider1.addEventListener("input", sliderActions);

        function sliderActions() {
            var newVolume = slider1.value;

            display1.innerText = newVolume; // range 0 to 100
            audio1.volume = newVolume / 100; // range 0 to 1 
        }
    </script>
</body>
</html>
