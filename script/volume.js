var audio1 = document.getElementById("audio1");
var slider1 = document.getElementById("slider1");

slider1.addEventListener("input", sliderActions);

function sliderActions( )
{
  var newVolume = slider1.value;
  audio1.volume = newVolume / 100; // range 0 to 1 
}